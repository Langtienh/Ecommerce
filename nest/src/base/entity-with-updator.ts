import { User } from '@/users/entities/user.entity'
import { Column, JoinColumn, ManyToOne } from 'typeorm'
import { EntityWithDate, entityWithDateProperties } from './entity-with-date'

export class EntityWithUpdator extends EntityWithDate {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updater_id' })
  updater: User

  @Column({ name: 'updater_id', default: 2 })
  updaterId: number

  @Column({ name: 'creator_id', default: 2 })
  creatorId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User
}

export const entityWithUpdatorProperties = {
  ...entityWithDateProperties,
  creatorId: 'number',
  updaterId: 'number'
}
