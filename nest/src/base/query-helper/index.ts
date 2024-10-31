import { Transform } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'
import { buildFilter } from './build-filter'
import { buidSorter } from './build-sorter'
import { queryHelperUtil } from './more'

export class QueryBase {
  [key: string]: string | string[]

  @IsOptional()
  search?: string

  @IsOptional()
  page?: string

  @IsOptional()
  limit?: string

  @IsOptional()
  sort?: string
}

export const queryHelper = {
  ...queryHelperUtil,
  buildQuery: <T>(query: QueryBase, cls: new () => T) => {
    const { limit, page, sort, search, ...filters } = query
    const _limit = +limit || 10
    const _page = +page || +page > 1 ? +page : 1
    const order = buidSorter(cls, sort)
    return {
      limit: _limit,
      page: _page,
      order: buidSorter(cls, sort),
      where: buildFilter(cls, filters),
      search: search || '',
      skip: _limit > 0 ? (_page - 1) * _limit : undefined,
      take: _limit > 0 ? _limit : undefined
    }
  }
}

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
