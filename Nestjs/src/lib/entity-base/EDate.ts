import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TypeAccessConvert } from '../utils'

export class EDate {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export const EDateFields = {
  id: TypeAccessConvert.NUMBER,
  createdAt: TypeAccessConvert.DATE,
  updatedAt: TypeAccessConvert.DATE
}
