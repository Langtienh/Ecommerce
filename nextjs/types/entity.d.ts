enum UserStatus {
  UNVERIFY = 'unverify',
  VERIFY = 'verify',
  LOCKED = 'locked'
}

interface User {
  id: number
  name: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
  roleId: number
  status: UserStatus
  avatar?: string
}

enum AddressType {
  HOME = 'Nhà riêng',
  WORK = 'Công ty'
}

interface Address {
  id: number
  type: AddressType
  name: string
  address: string
  detail: string
  isDefault: boolean
  userId: number
}

// role
interface Role {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

// resource
interface Resource {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  creatorId: number
  updaterId: number
}

// group
interface Group {
  id: number
  name: string
  resourceId: number
}

// permission
interface Permission {
  id: number
  name: string
  apiPath: string
  groupId: number
  method: string
  isActive: boolean
}
