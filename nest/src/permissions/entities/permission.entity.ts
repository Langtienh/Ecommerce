import { entityWithDateProperties } from '@/base/entity-with-date'
import { EntityWithSoftDelete } from '@/base/entity-with-soft-delete'
import { Property } from '@/decorator/customize'
import { Group } from '@/groups/entities/group.entity'
import { Role } from '@/roles/entities/role.entity'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm'

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

@Property({
  ...entityWithDateProperties,
  name: 'string',
  apiPath: 'string',
  method: 'string',
  isActive: 'boolean',
  groupId: 'number'
})
@Entity()
export class Permission extends EntityWithSoftDelete {
  @Column()
  name: string

  @Column({ name: 'api_path' })
  apiPath: string

  @Column({ type: 'enum', enum: HTTP_METHOD })
  method: HTTP_METHOD

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'group_id' })
  groupId: number

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[]
}
