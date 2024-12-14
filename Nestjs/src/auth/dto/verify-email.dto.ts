import { IsNotEmpty, IsString } from 'class-validator'

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  verifyEmailToken: string

  @IsString()
  @IsNotEmpty()
  otp: string
}
