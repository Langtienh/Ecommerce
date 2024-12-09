export enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

export enum FilerOperator {
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  LIKE = 'like',
  IN = 'in',
  NOTIN = 'notin',
  BETWEEN = 'between'
}

export type SearchParams = Record<string, string | string[]>
export type SearchPramsFormart = Record<string, string>
export type Filter = Record<string, Record<string, string | string[]>>
export type Sort = Record<string, SortType>
