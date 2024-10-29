import { HTTP_METHOD } from 'src/permissions/entities/permission.entity'

export const permissionInitialized: {
  name: string
  apiPath: string
  method: HTTP_METHOD
  isActive: boolean
  groupId: number
}[] = [
  {
    name: 'Đăng xuất',
    apiPath: '/api/v1/authentication/logout',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 12
  },
  {
    name: 'Đổi mật khẩu',
    apiPath: '/api/v1/authentication/password/change',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 13
  },
  {
    name: 'Xác minh email',
    apiPath: '/api/v1/authentication/resend-verify-email',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 13
  },
  {
    name: 'Xóa nhiều nhóm',
    apiPath: '/api/v1/authorization/groups',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Xem nhiều nhóm',
    apiPath: '/api/v1/authorization/groups',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Thêm nhóm',
    apiPath: '/api/v1/authorization/groups',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Cập nhật nhóm',
    apiPath: '/api/v1/authorization/groups/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Xem nhóm',
    apiPath: '/api/v1/authorization/groups/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xóa nhóm',
    apiPath: '/api/v1/authorization/groups/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Xem nhiều quyền',
    apiPath: '/api/v1/authorization/permissions',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xóa nhiều quyền',
    apiPath: '/api/v1/authorization/permissions',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Thêm quyền',
    apiPath: '/api/v1/authorization/permissions',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Cập nhật quyền',
    apiPath: '/api/v1/authorization/permissions/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Xóa quyền',
    apiPath: '/api/v1/authorization/permissions/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Xem quyền',
    apiPath: '/api/v1/authorization/permissions/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xem nhiều tài nguyên',
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
    name: 'Xem tài nguyên',
    apiPath: '/api/v1/authorization/resources/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xem nhiều chi tiết tài nguyên',
    apiPath: '/api/v1/authorization/resources/:id/permissions',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xem nhiều vai trò',
    apiPath: '/api/v1/authorization/roles',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Thêm vai trò',
    apiPath: '/api/v1/authorization/roles',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Xóa vai trò',
    apiPath: '/api/v1/authorization/roles/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Cập nhật vai trò',
    apiPath: '/api/v1/authorization/roles/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Xem chi tiết vai trò',
    apiPath: '/api/v1/authorization/roles/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Xem hồ sơ của tôi',
    apiPath: '/api/v1/me',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 9
  },
  {
    name: 'Cập nhật hồ sơ của tôi',
    apiPath: '/api/v1/me',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 10
  },
  {
    name: 'Xem địa chỉ của tôi',
    apiPath: '/api/v1/me/address',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 9
  },
  {
    name: 'Thêm địa chỉ',
    apiPath: '/api/v1/me/address',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 10
  },
  {
    name: 'Xem một địa chỉ',
    apiPath: '/api/v1/me/address/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 9
  },
  {
    name: 'Xóa địa chỉ',
    apiPath: '/api/v1/me/address/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 10
  },
  {
    name: 'Cập nhật địa chỉ của tôi',
    apiPath: '/api/v1/me/address/:id',
    method: HTTP_METHOD.PUT,
    isActive: true,
    groupId: 10
  },
  {
    name: 'Xem nhiều địa chỉ',
    apiPath: '/api/v1/users',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 5
  },
  {
    name: 'Thêm người dùng',
    apiPath: '/api/v1/users',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 6
  },
  {
    name: 'Xem một người dùng',
    apiPath: '/api/v1/users/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 5
  },
  {
    name: 'Cập nhật người dùng',
    apiPath: '/api/v1/users/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 7
  },
  {
    name: 'Xóa một người dùng (xóa mềm)',
    apiPath: '/api/v1/users/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 8
  }
]
