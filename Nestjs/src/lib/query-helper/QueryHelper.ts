import { PaginationResponse } from '../pagination/pagination.interface'
import { TypeAccessConvert } from '../utils'
import { Filter } from './Filter'
import { QueryBase } from './query.interface'
import { Sorter } from './Sorter'

export class QueryHelper {
  static buildQuery(fieldAccess: Record<string, TypeAccessConvert>, query: QueryBase) {
    const limit = +query.limit || 10
    const take = limit > 0 ? limit : undefined
    const page = +query.page || 1
    const skip = limit > 0 ? (page - 1) * limit : undefined
    const sort = query.sort
    const order = sort ? Sorter.build(fieldAccess, query.sort) : undefined
    const search = query.search || ''
    const filter = query.filter
    const where = filter ? Filter.build(fieldAccess, query.filter) : undefined
    return {
      search,
      take,
      skip,
      order,
      where
    }
  }

  static buildReponse<T>(data: T[], totalItem: number, query: QueryBase): PaginationResponse<T> {
    const limit = +query.limit || 10
    const page = +query.page || 1
    const totalPage = Math.ceil(totalItem / limit)
    return {
      meta: {
        page,
        limit,
        totalPage,
        totalItem
      },
      result: data
    }
  }
}
