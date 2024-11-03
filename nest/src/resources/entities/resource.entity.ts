import { EntityWithUpdator, entityWithUpdatorProperties } from '@/base/entity-with-updator'
import { Property } from '@/decorator/customize'
import { Group } from '@/groups/entities/group.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
@Property({ ...entityWithUpdatorProperties, name: 'string', description: 'string' })
export class Resource extends EntityWithUpdator {
  @Column({ unique: true })
  name: string

  @Column()
  description: string

  @OneToMany(() => Group, (group) => group.resource)
  groups: Group[]
}
