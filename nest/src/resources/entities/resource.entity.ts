import { EntityWithUpdateByFields, EntityWithUpdator } from 'src/base/entity-with-updator'
import { Property } from 'src/decorator/customize'
import { Group } from 'src/groups/entities/group.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
export class Resource extends EntityWithUpdator {
  @Property
  @Column({ unique: true })
  name: string

  @Property
  @Column()
  description: string

  @OneToMany(() => Group, (group) => group.resource)
  groups: Group[]
}

export const ResourceFields = ['name', 'description', ...EntityWithUpdateByFields]
