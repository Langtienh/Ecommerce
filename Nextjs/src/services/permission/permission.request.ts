import { CrudWithPaginate } from '@/lib/crud'
import {
  AddPermissionType,
  Permission,
  PermissionDetail,
  UpdatePermissionType
} from './permission.schema'

export class PermissionRequest extends CrudWithPaginate<
  PermissionDetail,
  PermissionDetail,
  Permission,
  AddPermissionType,
  UpdatePermissionType
> {}

export const permissionRequest = new PermissionRequest('permissions')
