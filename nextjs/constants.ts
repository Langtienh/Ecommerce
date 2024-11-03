import { UserStatus } from './services/user-request-api'

export interface COOKIES_OPTIONS_TYPE {
  httpOnly?: boolean | undefined
  secure?: boolean | undefined
  domain?: string | undefined
  expires?: number | Date | undefined
  maxAge?: number | undefined
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined
  path?: string | undefined
  priority?: 'low' | 'medium' | 'high' | undefined
}

export interface SET_COOKIES_OPTIONS_TYPE extends COOKIES_OPTIONS_TYPE {
  name: string
  value: string
}
export const COOKIES_OPTIONS: COOKIES_OPTIONS_TYPE = {
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
