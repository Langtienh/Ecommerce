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
import { queryHelperUtil } from './more'

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

// Hàm chuyển đổi chuỗi thành kiểu dữ liệu phù hợp
function convertValue(type: any, value: string) {
  switch (type) {
    case String:
      return value
    case Number:
      return Number(value)
    case Boolean:
      return value === 'true'
    case Date:
      return new Date(value)
    default:
      return value
  }
}

function convertedValueArray(type: any, value: string | string[]) {
  return queryHelperUtil.toArray(value).map((v) => convertValue(type, v))
}

export function buildWhereClause<T>(cls: new () => T, filters: Filters<T>): FindOptionsWhere<T> {
  const where: FindOptionsWhere<T> = {}
  const instance = new cls()
  for (const [field, condition] of Object.entries(filters)) {
    const type = Reflect.getMetadata('type', instance, field)
    if (typeof condition === 'object' && condition !== null) {
      for (const [operator, value] of Object.entries(condition)) {
        const convertedValue = convertValue(type, value as string)
        switch (operator.toLowerCase()) {
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
          case 'in':
            where[field] = In(convertedValueArray(type, value) as T[keyof T][])
            break
          case 'notin':
            where[field] = Not(In(convertedValueArray(type, value) as T[keyof T][]))
            break
          case 'between':
            if (Array.isArray(value) && value.length === 2) {
              const convertedValues = convertedValueArray(type, value)
              where[field] = Between(convertedValues[0] as T[keyof T], convertedValues[1] as T[keyof T])
            }
            break
          default:
            break
        }
      }
    } else {
      const convertedValue = convertValue(type, condition as string)
      where[field] = convertedValue
    }
  }

  return where
}

export const buildFilter = <T>(cls: new () => T, filterObj: Record<string, string | string[]>) => {
  const fieldOfT = queryHelperUtil.getKey(cls)
  const obj: Record<keyof T, any> = {} as Record<keyof T, any>
  Object.keys(filterObj).forEach((key) => {
    if (fieldOfT.includes(key as keyof T)) {
      obj[key] = filterObj[key]
    }
  })
  return buildWhereClause(cls, obj)
}
