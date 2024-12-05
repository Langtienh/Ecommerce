import { IsArray, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateRoleDto {
  @MaxLength(63)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(63)
  @IsNotEmpty()
  description: string

  @IsInt({ each: true })
  @IsArray()
  @IsNotEmpty()
  permissionIds: number[]

  @IsInt()
  @IsNotEmpty()
  roleLevel: number
}
