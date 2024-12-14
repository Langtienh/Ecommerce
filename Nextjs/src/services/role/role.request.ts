import { CrudWithPaginate } from '@/lib/crud'
import { AddRoleType, RoleDetail, RolePermissions, UpdateRoleType } from './role.schema'

export class RoleRequest extends CrudWithPaginate<
  RoleDetail,
  RolePermissions,
  RolePermissions,
  AddRoleType,
  UpdateRoleType
> {}
export const roleRequest = new RoleRequest('roles')
