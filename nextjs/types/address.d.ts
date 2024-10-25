// address
interface Province {
  id: string
  name: string
  slug: string
  type: string
  nameWithType: string
  code: string
  isDeleted: boolean
}

interface District {
  id: string
  name: string
  type: string
  slug: string
  nameWithType: string
  path: string
  pathWithType: string
  code: string
  parentCode: string
  isDeleted: boolean
}

interface Ward {
  id: string
  name: string
  type: string
  slug: string
  nameWithType: string
  path: string
  pathWithType: string
  code: string
  parentCode: string
  isDeleted: boolean
}
