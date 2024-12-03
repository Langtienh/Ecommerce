import { Transform } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export type TFilter = Record<string, string | string[] | Record<string, string | string[]>>

export class ParamIdDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  id: number
}

export class QueryIdsDto {
  @IsInt({ each: true })
  @Transform(({ value }) => value.split(',').map(Number))
  ids: number[]
}
export class PaginationQuery {
  @IsOptional()
  search?: string

  @IsOptional()
  page?: string

  @IsOptional()
  limit?: string
}

export class QueryBase extends PaginationQuery {
  @IsOptional()
  sort?: string

  @IsOptional()
  filter?: TFilter
}
