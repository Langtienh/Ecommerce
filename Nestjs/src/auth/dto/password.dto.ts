import { PasswordDto } from '@/users/dto'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ResetPasswordDto extends PasswordDto {
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string

  @IsString()
  @IsNotEmpty()
  otp: string
}

export class VerifyForgotPasswordOTPDto {
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string

  @IsString()
  @IsNotEmpty()
  otp: string
}

export class ChangePasswordDto extends PasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string
}

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
