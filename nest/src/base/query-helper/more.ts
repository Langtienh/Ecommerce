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
  // Hàm trả về các khóa của class
  getKey<T>(cls: new () => T): (keyof T)[] {
    const instance = new cls()
    return (Reflect.getMetadata('properties', instance) as (keyof T)[]) || []
  }
}
