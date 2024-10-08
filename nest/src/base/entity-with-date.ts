import { ALLOWED_TYPES } from 'src/lib/utils';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {
  EntityWithSoftDelete,
  EntityWithSoftDeleteFields,
} from './entity-with-soft-delete';

export class EntityWithDate extends EntityWithSoftDelete {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export const EntityWithDateFields = [
  { value: 'createdAt', type: ALLOWED_TYPES.DATE },
  { value: 'updatedAt', type: ALLOWED_TYPES.DATE },
  ...EntityWithSoftDeleteFields,
];
