import { FindOptionsOrder } from 'typeorm'
import { toArray, TypeAccessConvert } from '../utils'

export class Sorter {
  static build = <T>(
    fieldAccess: Record<string, TypeAccessConvert>,
    sort?: string | string[]
  ): FindOptionsOrder<T> => {
    const fields = Object.keys(fieldAccess)
    const result: FindOptionsOrder<T> = {}
    const arr = toArray(sort)
    arr.forEach((item) => {
      const char = item.charAt(0)
      const field = item.slice(1)
      if (char === '-') {
        if (field && fields.includes(field)) {
          result[field] = 'DESC'
        }
      } else {
        if (field && fields.includes(item)) {
          result[item] = 'ASC'
        }
      }
    })
    return result
  }
}
