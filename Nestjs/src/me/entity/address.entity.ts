import { User } from '@/users/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum AddressType {
  HOME = 'Nhà riêng',
  WORK = 'Công ty'
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: AddressType })
  type: AddressType

  @Column({ length: 63 })
  name: string

  @Column({ length: 127 })
  address: string

  @Column({ length: 127 })
  detail: string

  @Column({ default: false, name: 'is_default' })
  isDefault: boolean

  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}

export const AddressFileds = ['id', 'type', 'name', 'address', 'detail', 'isDefault', 'userId']
