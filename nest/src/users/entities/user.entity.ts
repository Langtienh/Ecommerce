import { EntityWithDate, entityWithDateProperties } from '@/base/entity-with-date'
import { Property } from '@/decorator/customize'
import { Address } from '@/me/entity/address.entity'
import { Role } from '@/roles/entities/role.entity'
import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

export enum UserStatus {
  UNVERIFY = 'unverify',
  VERIFY = 'verify',
  LOCKED = 'locked'
}

@Property({
  ...entityWithDateProperties,
  email: 'string',
  name: 'string',
  phone: 'string',
  roleId: 'number',
  status: 'string'
})
@Entity('users')
export class User extends EntityWithDate {
  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Exclude()
  @Column()
  password: string

  @Column({ nullable: true, length: 15 })
  phone: string

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.UNVERIFY })
  status: UserStatus

  @Column({ nullable: true })
  avatar?: string

  @Column({ name: 'role_id', default: 1 })
  roleId: number

  @Exclude()
  @Column({ name: 'refresh_token', length: 255, nullable: true })
  refreshToken: string

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[]

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role
}
