import { z } from 'zod'
import { CRUDWithAccsessToken } from './CRUD.class'
import { Permission } from './permission-request-api'

export interface Role {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface RoleDetail extends Role {
  permissions: Permission[]
}

export const AddRoleSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  description: z.string({ message: 'Mô tả không được để trống' }),
  permissionIds: z.array(z.number())
})
export const UpdateRoleSchema = AddRoleSchema.partial()
export type AddRoleType = z.infer<typeof AddRoleSchema>
export type UpdateRoleType = z.infer<typeof UpdateRoleSchema>

class RoleRequestApi extends CRUDWithAccsessToken<Role, RoleDetail, Role, AddRoleType, UpdateRoleType> {
  constructor() {
    super('/authorization/roles')
  }
}
const roleRequestApi = new RoleRequestApi()
export default roleRequestApi
