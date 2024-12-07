import { UserStatus } from '@/users/entities/user.entity'

export const usersInitialized = [
  {
    email: 'user@gmail.com',
    name: 'User',
    status: UserStatus.VERIFY,
    roleId: 1,
    phone: '0123456789',
    avatar: 'https://i.pinimg.com/736x/be/4f/ff/be4fffdf34043a88966c8afa5e3cc1c5.jpg'
  },
  {
    email: 'systemadmin@email.com',
    name: 'System admin',
    status: UserStatus.VERIFY,
    roleId: 2,
    phone: '0123456789',
    avatar: 'https://i.pinimg.com/564x/46/63/0e/46630e22923aa721d42d803a4e4e8087.jpg'
  },
  {
    email: 'admin@gmail.com',
    name: 'Admin',
    status: UserStatus.VERIFY,
    roleId: 3,
    phone: '0123456789',
    avatar: 'https://i.pinimg.com/564x/4b/27/e0/4b27e09ccbfbfd1aa2f7d3a2c89a9baa.jpg'
  },
  {
    email: 'admindemo@gmail.com',
    name: 'Viewer admin',
    status: UserStatus.VERIFY,
    roleId: 4,
    phone: '0123456789',
    avatar: 'https://i.pinimg.com/control/564x/59/d4/2a/59d42aceb23c0d8ed7a2644fbd54d1f2.jpg'
  }
]
