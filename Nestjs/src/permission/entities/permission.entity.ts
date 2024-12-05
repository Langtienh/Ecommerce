import { EUpdator, EUpdatorFields } from '@/lib/entity-base'
import { TypeAccessConvert } from '@/lib/utils'
import { Role } from '@/roles/entities/role.entity'
import { Column, Entity, ManyToMany } from 'typeorm'

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum PERMISSION_GROUP {
  VIEW_ALL = 'View all',
  CREATE = 'Create',
  m = 'Update',
  DELETE = 'Delete',
  SOFT_DELETE = 'Soft delete'
}

@Entity()
export class Permission extends EUpdator {
  @Column()
  name: string

  @Column({ name: 'api_path' })
  apiPath: string

  @Column({ type: 'enum', enum: HTTP_METHOD })
  method: HTTP_METHOD

  @Column({ type: 'enum', enum: PERMISSION_GROUP })
  group: PERMISSION_GROUP

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[]
}

export const permissionFields = {
  ...EUpdatorFields,
  name: TypeAccessConvert.STRING,
  apiPath: TypeAccessConvert.STRING,
  group: TypeAccessConvert.STRING,
  method: TypeAccessConvert.STRING,
  isActive: TypeAccessConvert.BOOLEAN,
  groupId: TypeAccessConvert.NUMBER
}
