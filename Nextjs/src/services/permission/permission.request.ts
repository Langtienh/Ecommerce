import { Crud } from '@/lib/crud'
import { AddPermissionType, Permission, UpdatePermissionType } from './permission.schema'

export class PermissionRequest extends Crud<
  Permission,
  Permission,
  Permission,
  AddPermissionType,
  UpdatePermissionType
> {}

export const permissionRequest = new PermissionRequest('permissions')
