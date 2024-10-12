import { User } from 'src/users/entities/user.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { EntityWithDate, EntityWithDateFields } from './entity-with-date';

export class EntityWithUpdator extends EntityWithDate {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updater_id' })
  updater: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}

export const EntityWithUpdateByFields = [
  'updater_id',
  'creator_id',
  ...EntityWithDateFields,
];
