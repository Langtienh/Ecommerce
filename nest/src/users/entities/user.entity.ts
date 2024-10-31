import { Exclude } from 'class-transformer'
import { EntityWithDate } from 'src/base/entity-with-date'
import { Property } from 'src/decorator/customize'
import { Address } from 'src/me/entity/address.entity'
import { Role } from 'src/roles/entities/role.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

export enum UserStatus {
  UNVERIFY = 'unverify',
  VERIFY = 'verify',
  LOCKED = 'locked'
}

@Entity('users')
export class User extends EntityWithDate {
  @Property
  @Column({ unique: true })
  email: string

  @Property
  @Column()
  name: string

  @Exclude()
  @Column()
  password: string

  @Property
  @Column({ nullable: true, length: 15 })
  phone: string

  @Property
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.UNVERIFY
  })
  status: UserStatus

  @Property
  @Column({ nullable: true })
  avatar?: string

  @Property
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
