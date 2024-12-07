export const rolesInitialized = [
  {
    name: 'User',
    roleLevel: 10,
    description: 'Role mặc định khi tạo mới tài khoản'
  },
  {
    name: 'System admin',
    roleLevel: 0,
    description: 'Role của người quản lý tất cả hệ thống, full quyền'
  },
  {
    name: 'Admin',
    roleLevel: 1,
    description: 'Role của người quản lý hệ thống, quyền quản lý tài khoản'
  },
  {
    name: 'Viewer admin',
    roleLevel: 2,
    description: 'Role này có thể xem tất cả nhưng không thể sửa, xóa dữ liệu'
  }
]
