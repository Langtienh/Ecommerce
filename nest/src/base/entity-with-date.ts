import { Property } from 'src/decorator/customize'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { EntityWithSoftDelete, EntityWithSoftDeleteFields } from './entity-with-soft-delete'

export class EntityWithDate extends EntityWithSoftDelete {
  @Property
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Property
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export const EntityWithDateFields = ['createdAt', 'updatedAt', ...EntityWithSoftDeleteFields]
