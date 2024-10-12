import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { QueryHelper } from './query-helper';

export class QueryBase {
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? +value : 1))
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? +value : 10))
  limit: number = 10;

  @Transform(({ value }) => QueryHelper.toArray(value))
  @IsOptional()
  sort: string[] = ['id'];
}
