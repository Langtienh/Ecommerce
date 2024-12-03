export interface PaginationQuery {
  page: number
  limit: number
}

export interface PaginationResponse {
  meta: {
    page: number
    limit: number
    totalPage: number
    totalItem: number
  }
  result: Record<string, any>[]
}

export class Pagination {
  page: number
  limit: number
  totalItem: number
  result: Record<string, any>[]
}
