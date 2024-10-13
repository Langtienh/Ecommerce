import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { QueryHelper } from 'src/base/query-helper';
import { QueryBase } from 'src/base/qurery-base';
import { HTTP_METHOD } from '../entities/permission.entity';

export class QueryPremissionDto extends QueryBase {
  @IsEnum(HTTP_METHOD, { each: true })
  @IsArray()
  @Transform(({ value }) => QueryHelper.toArray(value.toUpperCase()))
  @IsOptional()
  method?: HTTP_METHOD[];

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  apiPath?: string;

  @IsNumber({}, { each: true })
  @IsArray()
  @Transform(({ value }) => QueryHelper.toNumberArray(value))
  @IsOptional()
  groupId?: number[];

  @IsNumber({}, { each: true })
  @IsArray()
  @Transform(({ value }) => QueryHelper.toNumberArray(value))
  @IsOptional()
  resourceId?: number[];
}
