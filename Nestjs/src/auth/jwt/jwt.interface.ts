import { UserStatus } from '@/users/entities/user.entity'

export interface AccessTokenPayload {
  id: number
  email: string
  roleId: number
  status: UserStatus
}

export interface AccessTokenData extends AccessTokenPayload {
  iat: number
  exp: number
}

export interface TokenPayload {
  id: number
}

export interface TokenData extends TokenPayload {
  iat: number
  exp: number
}
