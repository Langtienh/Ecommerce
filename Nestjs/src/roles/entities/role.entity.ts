import { EntityWithUpdator, EntityWithUpdatorFields } from '@/lib/entity-base/entity-with-updator'
import { TypeAccessConvert } from '@/lib/utils'
import { Permission } from '@/permission/entities/permission.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

@Entity()
export class Role extends EntityWithUpdator {
  @Column({ unique: true })
  name: string

  @Column()
  roleLevel: number

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

export const roleFields = {
  ...EntityWithUpdatorFields,
  name: TypeAccessConvert.STRING,
  roleLevel: TypeAccessConvert.NUMBER,
  description: TypeAccessConvert.STRING
}
