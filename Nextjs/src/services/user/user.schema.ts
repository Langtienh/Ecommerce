import { z } from 'zod'

import { Role } from '../role'

export const passwordSchema = z
  .string()
  .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  .max(63, { message: 'Mật khẩu không được dài quá 63 ký tự' })
  .regex(/[A-Z]/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa'
  })
  .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất một số' })
  .regex(/[^A-Za-z0-9]/, {
    message: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'
  })

export const emailSchema = z.string().email({ message: 'Email không hợp lệ' })
export const nameSchema = z
  .string()
  .trim()
  .min(6, 'Tên tối thiểu 6 ký tự')
  .max(63, 'Tên tối đa 63 ký tự')
export const phoneSchema = z
  .string()
  .min(10, 'Không đúng định dạng số điện thoại')
  .max(11, 'Không đúng định dạng số điện thoại')

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
  password: z
    .string()
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    .max(63, { message: 'Mật khẩu không được dài quá 63 ký tự' })
    .regex(/[A-Z]/, {
      message: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa'
    })
    .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất một số' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'
    })
    .optional(),
  roleId: z.number(),
  status: z.enum(['', ...USER_STATUS_VALUES])
})
export const UpdateUserSchema = AddUserSchema.partial()

export type AddUserType = z.infer<typeof AddUserSchema>
export type UpdateUserType = z.infer<typeof UpdateUserSchema>
