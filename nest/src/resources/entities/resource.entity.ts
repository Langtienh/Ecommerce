import {
  EntityWithUpdateByFields,
  EntityWithUpdator,
} from 'src/base/entity-with-updator';
import { Group } from 'src/groups/entities/group.entity';
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
  'name',
  'description',
  ...EntityWithUpdateByFields,
];
