import {
  EntityWithUpdateByFields,
  EntityWithUpdator,
} from 'src/base/entity-with-updator';
import { Group } from 'src/groups/entities/group.entity';
import { ALLOWED_TYPES } from 'src/lib/utils';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Resource extends EntityWithUpdator {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Group, (group) => group.resource)
  groups: Group[];
}

export const ResourceFields = [
  { value: 'name', type: ALLOWED_TYPES.STRING },
  { value: 'description', type: ALLOWED_TYPES.STRING },
  ...EntityWithUpdateByFields,
];
