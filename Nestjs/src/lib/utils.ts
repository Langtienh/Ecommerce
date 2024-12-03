export const stringToArray = (str: string) => {
  if (!str) return []
  return str.split(',').map((item) => item.trim())
}

export const toArray = (value?: string | string[]): string[] => {
  if (!value) return []
  if (!Array.isArray(value)) return stringToArray(value)
  const result: string[] = []
  value.forEach((item) => {
    if (typeof item === 'string') {
      result.push(...stringToArray(item))
    } else {
      result.push(item)
    }
  })
  return result
}

export enum TypeAccessConvert {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date'
}

// todo: nếu input và type không phù hợp sẽ có thể xảy ra lỗi
export const convertValue = (type: TypeAccessConvert, value: string) => {
  switch (type.toLowerCase()) {
    case TypeAccessConvert.STRING:
      return value
    case TypeAccessConvert.NUMBER:
      return Number(value)
    case TypeAccessConvert.BOOLEAN:
      return value === 'true'
    case TypeAccessConvert.DATE:
      return new Date(value)
    default:
      return
  }
}
