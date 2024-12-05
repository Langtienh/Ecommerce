import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { TypeAccessConvert } from '../utils'
import { ESoftDelete, ESoftDeleteFields } from './ESoftDelete'

export class EDateAndSoftDelete extends ESoftDelete {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export const EDateAndSoftDeleteFields = {
  ...ESoftDeleteFields,
  createdAt: TypeAccessConvert.DATE,
  updatedAt: TypeAccessConvert.DATE
}
