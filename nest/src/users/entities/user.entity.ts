import { Exclude } from 'class-transformer';
import {
  EntityWithDate,
  EntityWithDateFields,
} from 'src/base/entity-with-date';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum UserStatus {
  UNVERIFY = 'unverify',
  VERIFY = 'verify',
  LOCKED = 'locked',
}

@Entity('users')
export class User extends EntityWithDate {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.UNVERIFY,
  })
  status: UserStatus;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ name: 'role_id', default: 1 })
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}

export const UserFields = [
  'email',
  'name',
  'phone',
  'status',
  'avatar',
  'roleId',
  ...EntityWithDateFields,
];
