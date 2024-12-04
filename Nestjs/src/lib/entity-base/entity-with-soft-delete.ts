import { DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { TypeAccessConvert } from '../utils'

export class EntityWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

export const EntityWithSoftDeleteFields = {
  deletedAt: TypeAccessConvert.DATE,
  id: TypeAccessConvert.NUMBER
}
