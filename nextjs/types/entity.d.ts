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

interface RoleDetail extends Role {
  permissions: Permission[]
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

interface ResourceDetail extends Resource {
  groups: GroupDetail[]
}

// group
interface Group {
  id: number
  name: string
  resourceId: number
}

interface GroupDetail extends Group {
  permissions: Permission[]
}

enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
// permission
interface PermissionPreFormat {
  id: number
  name: string
  apiPath: string
  groupId: number
  method: HTTP_METHOD
  isActive: boolean
  group: Group
}

interface Permission extends Omit<PermissionPreFormat, 'group'> {
  groupName: string
  resourceId: number
}
