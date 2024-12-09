interface BaseQuery {
  page?: number
  limit?: number
  search?: string
  sort?: string
  filter: Record<string, string>
}

interface PaginateMeta {
  page: number
  limit: number
  totalPage: number
  totalItem: number
}

interface Paginate<T> {
  meta: PaginateMeta
  result: T[]
}

interface OptionWithAccessToken {
  headers: {
    Authorization: string
  }
}
