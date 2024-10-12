import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { QueryBase } from 'src/base/qurery-base';
import { HTTP_METHOD } from '../entities/permission.entity';

export class QueryPremissionDto extends QueryBase {
  @IsEnum(HTTP_METHOD)
  @Transform(({ value }) => value.toUpperCase())
  @IsOptional()
  method?: HTTP_METHOD;
}
