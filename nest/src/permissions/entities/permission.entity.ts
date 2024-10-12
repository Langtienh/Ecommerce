import {
  EntityWithSoftDelete,
  EntityWithSoftDeleteFields,
} from 'src/base/entity-with-soft-delete';
import { Group } from 'src/groups/entities/group.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

@Entity()
export class Permission extends EntityWithSoftDelete {
  @Column()
  name: string;

  @Column({ name: 'api_path' })
  apiPath: string;

  @Column({ type: 'enum', enum: HTTP_METHOD })
  method: HTTP_METHOD;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'group_id' })
  groupId: number;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}

export const permissionFields = [
  'name',
  'apiPath',
  'method',
  'isActive',
  'groupId',
  ...EntityWithSoftDeleteFields,
];
