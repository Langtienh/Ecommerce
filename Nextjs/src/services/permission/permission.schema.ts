import { z } from 'zod'
import { Resource } from '../resource'
import { User } from '../user'

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
export const HTTP_METHOD_VALUES = Object.values(HTTP_METHOD)

export enum PERMISSION_GROUP {
  VIEW = 'View',
  CREATE = 'Create',
  Update = 'Update',
  DELETE = 'Delete',
  SOFT_DELETE = 'Soft_Delete'
}

export const PERMISSION_GROUP_VALUES = Object.values(PERMISSION_GROUP)
export interface Permission {
  id: number
  name: string
  apiPath: string
  group: PERMISSION_GROUP
  method: HTTP_METHOD
  isActive: boolean
  resourceId: number
}

export interface PermissionDetail extends Permission {
  creator: User
  updater: User
  resource: Resource
}

export interface PermissionFormatResource extends PermissionDetail {
  resourceIdName: string
}

export const AddPermissionSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  apiPath: z.string({ message: 'Đường dẫn không được để trống' }),
  method: z.string({ message: 'Phương thức không được để trống' }),
  group: z.string({ message: 'Group không được để trống' }),
  isActive: z.boolean({ message: 'Trạng thái không được để trống' }),
  resourceId: z.number({ message: 'Resource không được để trống' })
})

export const UpdatePermissionSchema = AddPermissionSchema.partial()
export type AddPermissionType = z.infer<typeof AddPermissionSchema>
export type UpdatePermissionType = z.infer<typeof UpdatePermissionSchema>
