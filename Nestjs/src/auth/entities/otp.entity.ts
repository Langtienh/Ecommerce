import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { Token } from './token.entity'

@Entity('otp')
export class Otp {
  @PrimaryColumn({ name: 'token_id' })
  tokenId: number

  @OneToOne(() => Token)
  token: Token

  @Column({ length: 6, type: 'char' })
  otp: string
}
