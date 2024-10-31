import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { UserStatus } from './services/user-request-api'

export const COOKIES_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true
}

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
