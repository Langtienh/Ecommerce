import { Crud } from '@/lib/crud'
import { AddRoleType, Role, RoleDetail, UpdateRoleType } from './role.schema'

export class RoleRequest extends Crud<Role, RoleDetail, Role, AddRoleType, UpdateRoleType> {}
export const roleRequest = new RoleRequest('roles')
