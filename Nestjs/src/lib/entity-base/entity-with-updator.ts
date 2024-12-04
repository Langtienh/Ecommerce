import { User } from '@/users/entities/user.entity'
import { Column, JoinColumn, ManyToOne } from 'typeorm'
import { TypeAccessConvert } from '../utils'
import { EntityWithDate, EntityWithDateFields } from './entity-with-date'

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

export const EntityWithUpdatorFields = {
  ...EntityWithDateFields,
  creatorId: TypeAccessConvert.NUMBER,
  updaterId: TypeAccessConvert.NUMBER
}
