import { FindOptionsOrder } from 'typeorm'
import { queryHelperUtil } from './more'

export const buidSorter = <T>(cls: new () => T, value?: string | string[]): FindOptionsOrder<T> => {
  const fields = queryHelperUtil.getKey(cls)
  const result: FindOptionsOrder<T> = {}
  const arr = queryHelperUtil.toArray(value)
  arr.forEach((item) => {
    const char = item.charAt(0)
    const field = item.slice(1)
    if (char === '-') {
      if (field && fields.includes(field as keyof T)) {
        result[field] = 'DESC'
      }
    } else {
      if (field && fields.includes(item as keyof T)) {
        result[item] = 'ASC'
      }
    }
  })
  return result
}
