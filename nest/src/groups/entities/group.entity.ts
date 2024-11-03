import { entityWithDateProperties } from '@/base/entity-with-date'
import { EntityWithSoftDelete } from '@/base/entity-with-soft-delete'
import { Property } from '@/decorator/customize'
import { Permission } from '@/permissions/entities/permission.entity'
import { Resource } from '@/resources/entities/resource.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Property({ ...entityWithDateProperties, name: 'string', resourceId: 'number' })
@Entity()
export class Group extends EntityWithSoftDelete {
  @Column()
  name: string

  @Column({ name: 'resource_id' })
  resourceId: number

  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource

  @OneToMany(() => Permission, (permission) => permission.group)
  permissions: Permission[]
}
