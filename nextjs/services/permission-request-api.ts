import { z } from 'zod'
import { CRUDWithAccsessToken } from './CRUD.class'
import { Group } from './group-request-api'

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export const HTTP_METHOD_VALUES = Object.values(HTTP_METHOD)

export interface Permission {
  id: number
  name: string
  apiPath: string
  groupId: number
  method: HTTP_METHOD
  isActive: boolean
}

export interface PermissionWittGroup extends Permission {
  group: Group
}

export const AddPermissionSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  apiPath: z.string({ message: 'Đường dẫn không được để trống' }),
  method: z.string({ message: 'Phương thức không được để trống' }),
  groupId: z.number({ message: 'Nhóm không được để trống' }),
  isActive: z.boolean({ message: 'Trạng thái không được để trống' })
})

export const UpdatePermissionSchema = AddPermissionSchema.partial()
export type AddPermissionType = z.infer<typeof AddPermissionSchema>
export type UpdatePermissionType = z.infer<typeof UpdatePermissionSchema>

class PermissionRequestApi extends CRUDWithAccsessToken<
  PermissionWittGroup,
  PermissionWittGroup,
  Permission,
  AddPermissionType,
  UpdatePermissionType
> {
  constructor() {
    super('authorization/permissions')
  }
}
const permissionRequestApi = new PermissionRequestApi()
export default permissionRequestApi
