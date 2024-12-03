export interface PaginationQuery {
  page: number
  limit: number
}

export interface PaginationResponse<T> {
  meta: {
    page: number
    limit: number
    totalPage: number
    totalItem: number
  }
  result: T[]
}

export class Pagination {
  page: number
  limit: number
  totalItem: number
  result: Record<string, any>[]
}
