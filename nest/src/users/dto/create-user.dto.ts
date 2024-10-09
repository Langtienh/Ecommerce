import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class PasswordDto {
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character',
  })
  @MaxLength(63)
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto extends PasswordDto {
  @MaxLength(63)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;
}
