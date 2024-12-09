import { UserStatus } from '@/services/user'

export interface JwtPayload {
  id: number
  iat: number
  exp: number
}

export interface AccessTokenPayload extends JwtPayload {
  roleId: number
  status: UserStatus
  email: string
}
