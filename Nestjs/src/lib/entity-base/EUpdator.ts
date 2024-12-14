import { User } from '@/users/entities/user.entity'
import { Column, JoinColumn, ManyToOne } from 'typeorm'
import { TypeAccessConvert } from '../utils'
import { EDate, EDateFields } from './EDate'

export class EUpdator extends EDate {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updater_id' })
  updater: User

  // todo: xem xét cách lưu creator và updater
  @Column({ name: 'updater_id', default: 2 })
  updaterId: number

  @Column({ name: 'creator_id', default: 2 })
  creatorId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User
}

export const EUpdatorFields = {
  ...EDateFields,
  creatorId: TypeAccessConvert.NUMBER,
  updaterId: TypeAccessConvert.NUMBER
}
