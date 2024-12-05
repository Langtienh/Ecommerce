import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator'
import { HTTP_METHOD, PERMISSION_GROUP } from '../entities/permission.entity'

export class CreatePermissionDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  apiPath: string

  @IsEnum(HTTP_METHOD)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  method: HTTP_METHOD

  @IsEnum(PERMISSION_GROUP)
  @IsNotEmpty()
  group: PERMISSION_GROUP

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsNumber()
  @IsNotEmpty()
  resourceId: number
}
