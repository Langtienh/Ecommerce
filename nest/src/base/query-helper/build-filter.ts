import {
  Between,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not
} from 'typeorm'
import { queryHelperUtil, QueryValue } from './more'

type FilterCondition<T> = {
  eq?: T
  ne?: T
  gt?: T
  gte?: T
  lt?: T
  lte?: T
  like?: T
  in?: T[]
  notIn?: T[]
  between?: [T, T]
}

type Filters<T> = {
  [P in keyof T]?: FilterCondition<T[P]> | T[P]
}

export function buildWhereClause<T>(cls: new () => T, query: Record<keyof T, QueryValue>): FindOptionsWhere<T> {
  const properties: Record<keyof T, string> = queryHelperUtil.getProperTies(cls)
  const where: FindOptionsWhere<T> = {}
  for (const [field, condition] of Object.entries(query)) {
    const type = properties[field]
    if (typeof condition === 'object' && condition !== null) {
      for (const [operator, value] of Object.entries(condition)) {
        const _operator = operator.toLowerCase()
        // array of values
        if (_operator === 'in' || _operator === 'notin' || _operator === 'between') {
          const formattedValue = queryHelperUtil
            .toArray(value as string | string[])
            .map((v) => queryHelperUtil.convertValue(type, v))
          if (_operator === 'in') where[field] = In(formattedValue as T[keyof T][])
          if (_operator === 'notin') where[field] = Not(In(formattedValue as T[keyof T][]))
          if (_operator === 'between' && formattedValue.length === 2) {
            const from = formattedValue[0] > formattedValue[1] ? formattedValue[1] : formattedValue[0]
            const to = formattedValue[0] > formattedValue[1] ? formattedValue[0] : formattedValue[1]
            where[field] = Between(from as T[keyof T], to as T[keyof T])
          }
        } else {
          const convertedValue = queryHelperUtil.convertValue(type, value as string)
          switch (_operator) {
            case 'eq':
              where[field] = convertedValue as T[keyof T]
              break
            case 'ne':
              where[field] = Not(convertedValue as T[keyof T])
              break
            case 'gt':
              where[field] = MoreThan(convertedValue as T[keyof T])
              break
            case 'gte':
              where[field] = MoreThanOrEqual(convertedValue as T[keyof T])
              break
            case 'lt':
              where[field] = LessThan(convertedValue as T[keyof T])
              break
            case 'lte':
              where[field] = LessThanOrEqual(convertedValue as T[keyof T])
              break
            case 'like':
              where[field] = ILike(`%${convertedValue}%`)
              break
            default:
              break
          }
        }
      }
    } else {
      where[field] = queryHelperUtil.convertValue(type, condition as string)
    }
  }

  return where
}

// step1: giữ lại các thuộc tính được phép query
// step2: chuyển đổi các giá trị query thành kiểu dữ liệu phù hợp và format
export const buildFilter = <T>(cls: new () => T, query: Record<string, QueryValue>) => {
  const queryAccess = queryHelperUtil.filterPropery(cls, query)
  return buildWhereClause(cls, queryAccess)
}
