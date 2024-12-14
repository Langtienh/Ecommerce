import { EUpdatorFields } from '@/lib/entity-base'
import { TypeAccessConvert } from '@/lib/utils'
import { Permission } from '@/permission/entities/permission.entity'
import { User } from '@/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updater_id' })
  updater: User

  // todo: xem xét cách lưu creator và updater
  @Column({ name: 'updater_id', nullable: true })
  updaterId: number

  @Column({ name: 'creator_id', nullable: true })
  creatorId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User

  @Column({ unique: true })
  name: string

  @Column({ name: 'role_level' })
  roleLevel: number

  @Column()
  description: string

  @ManyToMany(() => Permission, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' }
  })
  permissions: Permission[]
}

export const roleFields = {
  ...EUpdatorFields,
  name: TypeAccessConvert.STRING,
  roleLevel: TypeAccessConvert.NUMBER,
  description: TypeAccessConvert.STRING
}
