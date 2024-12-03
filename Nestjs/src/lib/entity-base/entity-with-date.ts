import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { EntityWithSoftDelete, EntityWithSoftDeleteFields } from './entity-with-soft-delete'

export class EntityWithDate extends EntityWithSoftDelete {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export const EntityWithDateFields = {
  ...EntityWithSoftDeleteFields,
  createdAt: 'Date',
  updatedAt: 'Date'
}
