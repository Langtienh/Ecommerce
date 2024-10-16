import { User } from 'src/users/entities/user.entity'
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

  @Column({ length: 255 })
  token: string

  @Column({ name: 'token_type', type: 'enum', enum: TOKEN_TYPE })
  tokenType: TOKEN_TYPE

  @Column({ length: 6, type: 'char' })
  otp: string

  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}
