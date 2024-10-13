import { OmitType, PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsUrl } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['email', 'password'])) {
  @IsUrl()
  @IsOptional()
  avatar: string
}
