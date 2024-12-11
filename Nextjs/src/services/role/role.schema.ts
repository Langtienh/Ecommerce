import { z } from 'zod'
import { Permission } from '../permission'
import { User } from '../user'

export interface Role {
  id: number
  name: string
  description: string
  roleLevel: number
  createdAt: string
  updatedAt: string
}

export interface RoleDetail extends Role {
  creator: User
  updater: User
}

export interface RolePermissions extends Role {
  permissions: Permission[]
}

export const AddRoleSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  description: z.string({ message: 'Mô tả không được để trống' }),
  permissionIds: z.array(z.number()),
  roleLevel: z.number({ message: 'Role level không được để trống' })
})
export const UpdateRoleSchema = AddRoleSchema.partial()
export type AddRoleType = z.infer<typeof AddRoleSchema>
export type UpdateRoleType = z.infer<typeof UpdateRoleSchema>
