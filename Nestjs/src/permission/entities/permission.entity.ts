import { EUpdator, EUpdatorFields } from '@/lib/entity-base'
import { TypeAccessConvert } from '@/lib/utils'
import { Resource } from '@/resource/entities/resource.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum PERMISSION_GROUP {
  VIEW = 'View',
  CREATE = 'Create',
  Update = 'Update',
  DELETE = 'Delete',
  SOFT_DELETE = 'Soft_Delete'
}

@Entity({ name: 'permissions' })
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

  @Column({ name: 'resource_id' })
  resourceId: number

  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource
}

export const permissionFields = {
  ...EUpdatorFields,
  name: TypeAccessConvert.STRING,
  apiPath: TypeAccessConvert.STRING,
  group: TypeAccessConvert.STRING,
  method: TypeAccessConvert.STRING,
  isActive: TypeAccessConvert.BOOLEAN,
  resourceId: TypeAccessConvert.NUMBER
}
