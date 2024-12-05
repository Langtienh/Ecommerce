import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password', 'roleId'])
) {}

export class UpdateUserPasswordDto extends PartialType(
  OmitType(CreateUserDto, ['name', 'email', 'phone', 'avatar', 'status', 'roleId'])
) {}

export class UpdateUserRoleDto extends PartialType(
  OmitType(CreateUserDto, ['name', 'email', 'phone', 'avatar', 'status', 'password'])
) {}
