import { Property } from 'src/decorator/customize'
import { User } from 'src/users/entities/user.entity'
import { Column, JoinColumn, ManyToOne } from 'typeorm'
import { EntityWithDate, EntityWithDateFields } from './entity-with-date'

export class EntityWithUpdator extends EntityWithDate {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updater_id' })
  updater: User

  @Property
  @Column({ name: 'updater_id', default: 2 })
  updaterId: number

  @Property
  @Column({ name: 'creator_id', default: 2 })
  creatorId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User
}

export const EntityWithUpdateByFields = ['updater_id', 'creator_id', ...EntityWithDateFields]
