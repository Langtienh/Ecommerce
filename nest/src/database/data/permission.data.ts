import { HTTP_METHOD } from '@/permissions/entities/permission.entity'

export const permissionInitialized: {
  name: string
  apiPath: string
  method: HTTP_METHOD
  isActive: boolean
  groupId: number
}[] = [
  {
    name: 'Xem thông tin nhiều group',
    apiPath: '/api/v1/authorization/groups',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Thêm group',
    apiPath: '/api/v1/authorization/groups',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Cập nhật group',
    apiPath: '/api/v1/authorization/groups/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Xem thông tin group',
    apiPath: '/api/v1/authorization/groups/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xóa group',
    apiPath: '/api/v1/authorization/groups/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Xem thông tin nhiều permission',
    apiPath: '/api/v1/authorization/permissions',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xóa nhiều permission',
    apiPath: '/api/v1/authorization/permissions',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Thêm permission',
    apiPath: '/api/v1/authorization/permissions',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Cập nhật permission',
    apiPath: '/api/v1/authorization/permissions/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Xóa permission',
    apiPath: '/api/v1/authorization/permissions/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Xem thông tin permission',
    apiPath: '/api/v1/authorization/permissions/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xem thông tin nhiều tài nguyên',
    apiPath: '/api/v1/authorization/resources',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xóa nhiều tài nguyên',
    apiPath: '/api/v1/authorization/resources',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Thêm tài nguyên',
    apiPath: '/api/v1/authorization/resources',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Cập nhật tài nguyên',
    apiPath: '/api/v1/authorization/resources/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Xóa tài nguyên',
    apiPath: '/api/v1/authorization/resources/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Xem thông tin tài nguyên',
    apiPath: '/api/v1/authorization/resources/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xem thông tin nhiều chi tiết tài nguyên',
    apiPath: '/api/v1/authorization/resources/:id/permissions',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xóa nhiều role',
    apiPath: '/api/v1/authorization/roles',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Xem thông tin nhiều role',
    apiPath: '/api/v1/authorization/roles',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Thêm role',
    apiPath: '/api/v1/authorization/roles',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Xóa role',
    apiPath: '/api/v1/authorization/roles/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Cập nhật role',
    apiPath: '/api/v1/authorization/roles/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Xem thông tin chi tiết role',
    apiPath: '/api/v1/authorization/roles/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xem thông tin một người dùng',
    apiPath: '/api/v1/users/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 5
  },
  {
    name: 'Xem thông tin nhiều người dùng',
    apiPath: '/api/v1/users',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 5
  },
  {
    name: 'Tạo mới một người dùng',
    apiPath: '/api/v1/users',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 8
  },
  {
    name: 'Cập nhật người dùng',
    apiPath: '/api/v1/users/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 7
  },
  {
    name: 'Xóa một người dùng',
    apiPath: '/api/v1/users/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 8
  },
  {
    name: 'Xóa nhiều người dùng',
    apiPath: '/api/v1/users',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 8
  }
]
