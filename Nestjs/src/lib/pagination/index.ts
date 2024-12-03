import { PaginationQuery, PaginationResponse } from './pagination.interface'
import { Pagination } from './pagination.interface'

export class PaginationBuilder {
  private pagination: Pagination

  constructor(query: PaginationQuery) {
    this.pagination.limit = query.limit ? +query.limit : 10
    this.pagination.page = query.page ? +query.page : 1
    this.pagination.totalItem = 0
    this.pagination.totalItem = 0
    this.pagination.result = []
  }

  totalItem(totalItem: number) {
    this.pagination.totalItem = totalItem
    return this
  }

  result(result: any[]) {
    this.pagination.result = result
    return this
  }

  getData(): PaginationResponse {
    const totalPage =
      this.pagination.limit > 0 ? Math.ceil(this.pagination.totalItem / this.pagination.limit) : 1
    const meta = {
      page: this.pagination.page,
      limit: this.pagination.limit,
      totalPage,
      totalItem: this.pagination.totalItem
    }
    return { meta, result: this.pagination.result }
  }

  getQuery() {
    return {
      take: this.pagination.limit > 0 ? this.pagination.limit : undefined,
      skip:
        this.pagination.limit > 0 ? (this.pagination.page - 1) * this.pagination.limit : undefined
    }
  }
}
