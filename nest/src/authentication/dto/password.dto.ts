import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyFogotPasswordDto {
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
