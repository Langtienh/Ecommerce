import { User } from '@/users/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum TOKEN_TYPE {
  ACCESS = 'access',
  REFRESH = 'refresh',
  VERIFY_EMAIL = 'verify_email',
  FORGOT_PASSWORD = 'reset_password'
}

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: string

  @Column({ name: 'token_type', type: 'enum', enum: TOKEN_TYPE })
  type: TOKEN_TYPE

  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}
