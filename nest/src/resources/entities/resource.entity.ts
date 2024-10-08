import {
  EntityWithUpdateByFields,
  EntityWithUpdator,
} from 'src/base/entity-with-updator';
import { ALLOWED_TYPES } from 'src/lib/utils';
import { Column, Entity } from 'typeorm';

@Entity()
export class Resource extends EntityWithUpdator {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}

export const ResourceFields = [
  { value: 'name', type: ALLOWED_TYPES.STRING },
  { value: 'description', type: ALLOWED_TYPES.STRING },
  ...EntityWithUpdateByFields,
];
