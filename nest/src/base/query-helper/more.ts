export type QueryValue = string | string[] | Record<string, string | string[]>

export const queryHelperUtil = {
  strToArr(str: string) {
    if (!str) return []
    return str.split(',').map((item) => item.trim())
  },

  toArray(value?: string | string[]): string[] {
    if (!value) return []
    if (!Array.isArray(value)) return this.strToArr(value)
    const result: string[] = []
    value.forEach((item) => {
      if (typeof item === 'string') {
        result.push(...this.strToArr(item))
      } else {
        result.push(item)
      }
    })
    return result
  },
  toNumberArray(value: any): number[] {
    return this.toArray(value).map((v: any) => +v)
  },
  toEnumArray(value: any, obj: Record<string, string>): any[] {
    return this.toArray(value).filter((item) => Object.values(obj).includes(item))
  },
  getProperTies<T>(clx: new () => T) {
    return Reflect.getMetadata('properties', clx)
  },
  convertValue(type: string, value: string) {
    switch (type.toLowerCase()) {
      case 'string':
        return value
      case 'number':
        return Number(value)
      case 'boolean':
        return value === 'true'
      case 'date':
        return new Date(value)
      default:
        return value
    }
  },
  filterPropery<T>(cls: new () => T, query: Record<string, QueryValue>): Record<keyof T, QueryValue> {
    const properties: Record<keyof T, string> = this.getProperTies(cls)
    const res: Record<keyof T, QueryValue> = {} as Record<keyof T, QueryValue>
    Object.keys(query).forEach((key) => {
      if (properties[key]) {
        res[key] = query[key] as QueryValue
      }
    })
    return res
  }
}
