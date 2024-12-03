import { Exclude } from 'class-transformer'
import { DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export class EntityWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

export const EntityWithSoftDeleteFields = {
  deletedAt: 'Date',
  id: 'number'
}
