import { formatSearchParams } from './query.func'
import { SearchParams, Sort, SortType } from './query.type'

class SortHelper {
  stringify = (sortObject: Sort) => {
    const sortArray = Object.keys(sortObject).map((key) => {
      return `${sortObject[key] == SortType.DESC ? '-' : ''}${key}`
    })
    const sortString = sortArray.join(',')
    return sortString ? `&sort=${sortString}` : ''
  }

  // &sort=id,name,-age
  parse = (searchParams: SearchParams): Sort => {
    const sort = formatSearchParams(searchParams).sort
    if (!sort) return {}
    const sortArray = sort.split(',')
    const sortObject: Sort = {}
    sortArray.forEach((value) => {
      if (value.charAt(0) === '-') {
        sortObject[value.slice(1)] = SortType.DESC
      } else {
        sortObject[value] = SortType.ASC
      }
    })
    return sortObject
  }

  delete = (searchParams: SearchParams, key: string) => {
    const sortObject = this.parse(searchParams)
    delete sortObject[key]
    return this.stringify(sortObject)
  }

  add = (searchParams: SearchParams, sortObject: Sort) => {
    const prevSort = this.parse(searchParams)
    const newSort: Sort = { ...prevSort, ...sortObject }
    return this.stringify(newSort)
  }
}

export const sortHelper = new SortHelper()
