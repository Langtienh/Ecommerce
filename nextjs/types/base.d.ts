interface BaseQuery {
  page?: number
  limit?: number
  search?: string
  sort?: string
}

interface Paginate<T> {
  meta: {
    page: number
    limit: number
    totalPage: number
    totalItem: number
  }
  result: T[]
}
