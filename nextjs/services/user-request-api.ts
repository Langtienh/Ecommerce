import { z } from 'zod'
import { CRUDWithAccsessToken } from './CRUD.class'

import http from '@/lib/http'
import { emailSchema, nameSchema, passwordSchema, phoneSchema } from './authen/schema'
import { Role } from './role-request-api'

export enum UserStatus {
  UNVERIFY = 'unverify',
  VERIFY = 'verify',
  LOCKED = 'locked'
}

export const USER_STATUS_VALUES = Object.values(UserStatus)

export interface User {
  id: number
  name: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
  roleId: number
  status: UserStatus
  avatar?: string
}

export interface UserDetail extends User {
  role: Role
}

export const AddUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  roleId: z.number(),
  status: z.enum(['', ...USER_STATUS_VALUES])
})
export const UpdateUserSchema = AddUserSchema.partial()

export type AddUserType = z.infer<typeof AddUserSchema>
export type UpdateUserType = z.infer<typeof UpdateUserSchema>

class UserRequestApi extends CRUDWithAccsessToken<UserDetail, User, User, AddUserType, UpdateUserType> {
  constructor() {
    super('/users')
  }
  softDelete = async (id: number) => {
    const option = await this.getOptionWithAccessToken()
    const res = await http.delete(`/users/${id}?softDelete=true`, option)
    return res
  }
}
const userRequestApi = new UserRequestApi()
export default userRequestApi
