import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PasswordDto } from 'src/users/dto/create-user.dto';

export class VerifyFogotPasswordDto {
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;
}

export class ResetPasswordDto extends PasswordDto {
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;
}

export class ChangePasswordDto extends PasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
