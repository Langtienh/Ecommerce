import { And, FindOptionsWhere, ILike } from 'typeorm'

export class Searcher {
  static build = <T>(
    fieldSearch: string[],
    search: string,
    where?: FindOptionsWhere<T>
  ): FindOptionsWhere<T>[] => {
    const result: FindOptionsWhere<T>[] = []
    for (const field of fieldSearch) {
      const initializeWhere = where ?? {}
      const prevValue = initializeWhere[field]
      initializeWhere[field] = prevValue
        ? And(prevValue, ILike(`%${search}%`))
        : ILike(`%${search}%`)
      result.push(initializeWhere)
    }
    return result
  }
}
