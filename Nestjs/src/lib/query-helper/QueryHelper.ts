import { PaginationResponse } from '../pagination/pagination.interface'
import { TypeAccessConvert } from '../utils'
import { Filter } from './Filter'
import { QueryBase } from './query.interface'
import { Sorter } from './Sorter'

export class QueryHelper {
  static buildQuery(fieldAccess: Record<string, TypeAccessConvert>, query: QueryBase) {
    const limit = +query.limit
    return {
      search: query.search || '',
      take: limit > 0 ? +query.limit : undefined,
      skip: limit > 0 ? (+query.page - 1) * limit : undefined,
      sort: Sorter.build(fieldAccess, query.sort),
      where: Filter.build(fieldAccess, query.filter)
    }
  }

  static buildReponse<T>(data: T[], totalItem: number, query: QueryBase): PaginationResponse<T> {
    const limit = +query.limit
    return {
      meta: {
        page: +query.page,
        limit,
        totalPage: limit > 0 ? Math.ceil(totalItem / +query.limit) : 1,
        totalItem
      },
      result: data
    }
  }
}
