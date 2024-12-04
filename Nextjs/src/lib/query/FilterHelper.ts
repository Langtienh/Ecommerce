import { Filter, SearchParams } from './types'
import { formatSearchParams } from './utils'

class FilterHelper {
  stringify = (record: Record<string, Record<string, string | string[]>>) => {
    return Object.keys(record).reduce((prevValue, currenValue) => {
      const condition: Record<string, string | string[]> = record[currenValue]
      const query = Object.entries(condition).reduce((prevValue, [operator, value]) => {
        return prevValue + `&filter[${currenValue}][${operator}]=${value}`
      }, '')
      return prevValue + query
    }, '')
  }

  parse = (searchParams: SearchParams): Filter => {
    const searchParamsFormat = formatSearchParams(searchParams)
    const filterObject: Record<string, Record<string, string>> = {}
    Object.entries(searchParamsFormat).forEach(([key, value]) => {
      // key = filter[field][operator] || key = filter[field]
      // value = string | string[]
      if (key.includes('filter')) {
        const field = key.split('[')[1].split(']')[0]
        const operator = key.split('[')[2] ? key.split('[')[2].split(']')[0] : 'eq'
        if (!filterObject[field]) {
          filterObject[field] = {}
        }
        filterObject[field][operator] = value
      }
    })
    return filterObject
  }

  // Hiện tại chỉ có thêm/thay thế field (nếu đã tồn tại)
  // todo: Cần thêm thêm/thay thế operator
  add = (searchParams: SearchParams, filterObject: Filter) => {
    const prevFilter = this.parse(searchParams)
    const newFilter: Filter = { ...prevFilter, ...filterObject }
    return this.stringify(newFilter)
  }

  delete = (searchParams: SearchParams, key: string) => {
    const filterObject = this.parse(searchParams)
    delete filterObject[key]
    return this.stringify(filterObject)
  }
}

export const filterHelper = new FilterHelper()
