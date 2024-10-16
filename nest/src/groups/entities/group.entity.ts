import { EntityWithSoftDelete, EntityWithSoftDeleteFields } from 'src/base/entity-with-soft-delete'
import { Permission } from 'src/permissions/entities/permission.entity'
import { Resource } from 'src/resources/entities/resource.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

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

export const groupFields = ['name', 'resourceId', ...EntityWithSoftDeleteFields]
