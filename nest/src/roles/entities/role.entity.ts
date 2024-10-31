import { EntityWithDate } from 'src/base/entity-with-date'
import { Property } from 'src/decorator/customize'
import { Permission } from 'src/permissions/entities/permission.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

@Entity()
export class Role extends EntityWithDate {
  @Column({ unique: true })
  @Property
  name: string

  @Column()
  @Property
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
