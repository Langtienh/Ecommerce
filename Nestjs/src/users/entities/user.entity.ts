import { EDateAndSoftDelete, EDateAndSoftDeleteFields } from '@/lib/entity-base'
import { TypeAccessConvert } from '@/lib/utils'
import { Role } from '@/roles/entities/role.entity'
import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

export enum UserStatus {
  UNVERIFY = 'unverify',
  VERIFY = 'verify',
  LOCKED = 'locked'
}

@Entity('users')
export class User extends EDateAndSoftDelete {
  @Column({ unique: true, length: 255 })
  email: string

  @Column({ length: 255 })
  name: string

  @Exclude()
  @Column({ length: 255 })
  password: string

  @Column({ nullable: true, length: 15 })
  phone: string

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.UNVERIFY })
  status: UserStatus

  @Column({ nullable: true, length: 255 })
  avatar?: string

  @Column({ name: 'role_id', default: 1 })
  roleId: number

  // @OneToMany(() => Address, (address) => address.user)
  // addresses: Address[]

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role
}
// giới hạn các field có thể query
export const UserFields = {
  ...EDateAndSoftDeleteFields,
  email: TypeAccessConvert.STRING,
  name: TypeAccessConvert.STRING,
  phone: TypeAccessConvert.STRING,
  roleId: TypeAccessConvert.NUMBER,
  status: TypeAccessConvert.STRING
}
