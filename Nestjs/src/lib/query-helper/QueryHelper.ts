import { FindOptionsWhere, ILike } from 'typeorm'
import { PaginationResponse } from '../pagination/pagination.interface'
import { TypeAccessConvert } from '../utils'
import { Filter } from './Filter'
import { QueryBase } from './query.interface'
import { Sorter } from './Sorter'

export class QueryHelper {
  static buildQuery<T>(
    fieldAccess: Record<string, TypeAccessConvert>,
    query: QueryBase,
    searchField?: (keyof T)[]
  ) {
    const limit = +query.limit || 10
    const take = limit > 0 ? limit : undefined
    const page = +query.page || 1
    const skip = limit > 0 ? (page - 1) * limit : undefined
    const sort = query.sort
    const order = sort ? Sorter.build<T>(fieldAccess, sort) : undefined
    const search = query.search || ''
    const filter = query.filter
    const whereDefault = filter ? Filter.build<T>(fieldAccess, query.filter) : undefined
    const where = searchField
      ? this.buildSearch<T>(searchField, search, whereDefault)
      : whereDefault
    return {
      search,
      take,
      skip,
      order,
      where
    }
  }

  static buildResponse<T>(data: T[], totalItem: number, query: QueryBase): PaginationResponse<T> {
    const limit = +query.limit || 10
    const page = +query.page || 1
    const totalPage = limit > 0 ? Math.ceil(totalItem / limit) : 1
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

  private static buildSearch = <T>(
    searchField: (keyof T)[],
    search: string,
    where?: FindOptionsWhere<T>
  ): FindOptionsWhere<T>[] => {
    const result: FindOptionsWhere<T>[] = []
    for (const field of searchField) {
      result.push({ ...where, [field]: ILike(`%${search}%`) })
    }
    return result
  }
}
