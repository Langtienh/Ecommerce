import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { HTTP_METHOD } from '../entities/permission.entity';

export class CreatePermissionDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  apiPath: string;

  @IsEnum(HTTP_METHOD)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  method: HTTP_METHOD;

  @IsInt()
  @IsNotEmpty()
  groupId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
