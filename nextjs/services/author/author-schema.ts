import { z } from 'zod'

export const AddResourceSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  description: z.string({ message: 'Mô tả không được để trống' })
})

export type AddResourceType = z.infer<typeof AddResourceSchema>

export const AddPermissionSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  apiPath: z.string({ message: 'Đường dẫn không được để trống' }),
  method: z.string({ message: 'Phương thức không được để trống' }),
  groupId: z.number({ message: 'Nhóm không được để trống' }),
  isActive: z.boolean({ message: 'Trạng thái không được để trống' })
})

const UpdatePermissionSchema = AddPermissionSchema.partial()

export type AddPermissionType = z.infer<typeof AddPermissionSchema>
export type UpdatePermissionType = z.infer<typeof UpdatePermissionSchema>

export const AddGroupSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  resourceId: z.number({ message: 'Resource không được để trống' })
})

export type AddGroupType = z.infer<typeof AddGroupSchema>

export const UpdateGroupSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' })
})

export type UpdateGroupType = z.infer<typeof UpdateGroupSchema>

export const AddRoleSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  description: z.string({ message: 'Mô tả không được để trống' })
})

export type AddRoleType = z.infer<typeof AddRoleSchema>
