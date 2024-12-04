import { SearchParams, SearchPramsFormart } from './types'

export const formatSearchParams = (searchParams: SearchParams): SearchPramsFormart => {
  const searchParamsFormart: SearchPramsFormart = {}
  for (const key in searchParams) {
    if (Array.isArray(searchParams[key])) {
      searchParamsFormart[key] = searchParams[key].join(',')
    } else {
      searchParamsFormart[key] = searchParams[key]
    }
  }
  return searchParamsFormart
}
