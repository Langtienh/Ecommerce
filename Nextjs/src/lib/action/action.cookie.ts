import { http } from '@/lib/http'
import { AccessTokenPayload, decodeJwtToken } from '@/lib/jwt'
import { ServerGetCookie, ServerSetCookie } from './action.func'

export async function setCookieWithToken(name: string, token: string, value?: string) {
  const decode = decodeJwtToken(token)
  await ServerSetCookie({
    name,
    value: value ? value : token,
    expires: new Date(decode.exp * 1000)
  })
}

interface IRefreshToken {
  accessToken: string
  refreshToken: string
}
export async function updateRefreshToken(param: IRefreshToken) {
  const { accessToken, refreshToken } = param
  await setCookieWithToken('accessToken', accessToken)
  await setCookieWithToken('refreshToken', refreshToken)
}

export async function getOptionWithAccessToken() {
  const result = {
    headers: {
      Authorization: ''
    }
  }
  if (typeof window === 'undefined') {
    // Server
    const accessToken = await ServerGetCookie('accessToken')
    result.headers.Authorization = `Bearer ${accessToken}`
  } else {
    // Client
    const accessToken = await ServerGetCookie('accessToken')
    if (accessToken) {
      result.headers.Authorization = `Bearer ${accessToken}`
      return result
    }
    const refreshToken = await ServerGetCookie('refreshToken')
    const res = await http.post<LoginResponse>('/auth/refresh-token', { refreshToken })
    await updateRefreshToken(res.data)
    result.headers.Authorization = `Bearer ${res.data.accessToken}`
  }
  return result
}

export async function getAccessTokenPayload() {
  const accessToken = await ServerGetCookie('accessToken')
  if (!accessToken) return null
  return decodeJwtToken(accessToken) as AccessTokenPayload
}
