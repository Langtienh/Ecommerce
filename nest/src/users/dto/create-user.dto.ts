import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength
} from 'class-validator'
import { UserStatus } from '../entities/user.entity'

export class PasswordDto {
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{6,}$/, {
    message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt và dài ít nhất 6 ký tự'
  })
  @MaxLength(63)
  @IsString()
  @IsNotEmpty()
  password: string
}

export class CreateUserDto extends PasswordDto {
  @MaxLength(63)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string

  @IsUrl()
  @IsOptional()
  avatar?: string

  @IsString()
  @IsOptional()
  status?: UserStatus

  @IsNumber()
  @IsOptional()
  roleId?: number
}
