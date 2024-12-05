import { DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { TypeAccessConvert } from '../utils'

export class ESoftDelete {
  @PrimaryGeneratedColumn()
  id: number

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

export const ESoftDeleteFields = {
  deletedAt: TypeAccessConvert.DATE,
  id: TypeAccessConvert.NUMBER
}
