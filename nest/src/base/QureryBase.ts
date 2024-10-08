import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QueryBase {
  @ApiProperty()
  @IsOptional()
  search?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => (value ? +value : 1))
  page: number = 1;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => (value ? +value : 10))
  limit: number = 10;

  @ApiProperty()
  @IsOptional()
  sort: string[] = ['id'];
}
