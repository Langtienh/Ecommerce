import { EntityWithDate, entityWithDateProperties } from '@/base/entity-with-date'
import { Property } from '@/decorator/customize'
import { Permission } from '@/permissions/entities/permission.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

@Property({ ...entityWithDateProperties, name: 'string', description: 'string' })
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
