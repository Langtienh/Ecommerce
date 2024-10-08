import { Exclude } from 'class-transformer';
import { ALLOWED_TYPES } from 'src/lib/utils';
import { DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class EntityWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export const EntityWithSoftDeleteFields = [
  { value: 'id', type: ALLOWED_TYPES.NUMBER },
  { value: 'deletedAt', type: ALLOWED_TYPES.DATE },
];
