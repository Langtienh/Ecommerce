import { EntityWithDate, EntityWithDateFields } from 'src/base/entity-with-date'
import { Permission } from 'src/permissions/entities/permission.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

@Entity()
export class Role extends EntityWithDate {
  @Column({ unique: true })
  name: string

  @Column()
  description: string

  @ManyToMany(() => Permission, (permission) => permission.roles, {
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

export const roleFields = ['name', 'description', ...EntityWithDateFields]
