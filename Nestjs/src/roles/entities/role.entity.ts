import { EUpdator, EUpdatorFields } from '@/lib/entity-base'
import { TypeAccessConvert } from '@/lib/utils'
import { Permission } from '@/permission/entities/permission.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

@Entity({ name: 'roles' })
export class Role extends EUpdator {
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
