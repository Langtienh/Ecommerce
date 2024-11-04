export enum Operator {
  EQUAL = 'eq',
  NOT_EQUAL = 'ne',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUAL = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUAL = 'lte',
  LIKE = 'like',
  IN = 'in',
  NOT_IN = 'notIn',
  BETWEEN = 'between'
}

interface Filter {
  key: string
  operator: Operator
  value: string
}

// filter: { key: 'name', operator: 'eq', value: 'John' } build => { name: { eq: 'John' } } url: ?name[eq]=John
export function buildSearchParam(filters: Filter[]) {
  const query = new URLSearchParams()
  filters.forEach(({ key, operator, value }) => {
    query.set(`${key}[${operator}]`, value)
  })
  return query
}

export function queryStringToObject(query: string) {
  const params = new URLSearchParams(query)
  const result: Record<string, any> = {}

  params.forEach((value, key) => {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value)
      } else {
        result[key] = [result[key], value]
      }
    } else {
      result[key] = value
    }
  })

  return result
}
