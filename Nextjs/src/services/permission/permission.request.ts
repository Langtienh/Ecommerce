import { Crud } from '@/lib/crud'
import {
  AddPermissionType,
  Permission,
  PermissionDetail,
  UpdatePermissionType
} from './permission.schema'

export class PermissionRequest extends Crud<
  PermissionDetail,
  PermissionDetail,
  Permission,
  AddPermissionType,
  UpdatePermissionType
> {}

export const permissionRequest = new PermissionRequest('permissions')
