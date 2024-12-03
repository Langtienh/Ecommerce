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
import { TFilter } from './query.interface'
import { convertValue, toArray, TypeAccessConvert } from '../utils'

// các toán tử được phép filter
enum FilerOperator {
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

export class Filter {
  static build<T>(
    fieldAccess: Record<string, TypeAccessConvert>,
    filter: TFilter
  ): FindOptionsWhere<T> {
    const where: FindOptionsWhere<T> = {}
    for (const [field, condition] of Object.entries(filter)) {
      // todo: type có chính xác hay không??
      const type = fieldAccess[field]
      if (typeof condition === 'object' && condition !== null) {
        for (const [conditionKey, value] of Object.entries(condition)) {
          const operator = conditionKey.toLowerCase()
          // array of values
          if (
            operator === FilerOperator.IN ||
            operator === FilerOperator.NOTIN ||
            operator === FilerOperator.BETWEEN
          ) {
            const formattedValue = toArray(value as string | string[]).map((v) =>
              convertValue(type, v)
            )
            if (operator === FilerOperator.IN) where[field] = In(formattedValue)
            if (operator === FilerOperator.NOTIN) where[field] = Not(In(formattedValue))
            if (operator === FilerOperator.BETWEEN && formattedValue.length === 2) {
              const from =
                formattedValue[0] > formattedValue[1] ? formattedValue[1] : formattedValue[0]
              const to =
                formattedValue[0] > formattedValue[1] ? formattedValue[0] : formattedValue[1]
              where[field] = Between(from, to)
            }
          } else {
            const convertedValue = convertValue(type, value as string)
            switch (operator) {
              case FilerOperator.EQ:
                where[field] = convertedValue
                break
              case FilerOperator.NE:
                where[field] = Not(convertedValue)
                break
              case FilerOperator.GT:
                where[field] = MoreThan(convertedValue)
                break
              case FilerOperator.GTE:
                where[field] = MoreThanOrEqual(convertedValue)
                break
              case FilerOperator.LT:
                where[field] = LessThan(convertedValue)
                break
              case FilerOperator.LTE:
                where[field] = LessThanOrEqual(convertedValue)
                break
              case FilerOperator.LIKE:
                where[field] = ILike(`%${convertedValue}%`)
                break
              default:
                break
            }
          }
        }
      } else {
        where[field] = convertValue(type, condition as string)
      }
    }

    return where
  }
}
