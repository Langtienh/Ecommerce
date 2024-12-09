import { http } from '@/lib/http'
import { AccessTokenPayload, decodeJwtToken } from '@/lib/jwt'
import {
  ServerDeleteCookie,
  ServerGetCookie,
  ServerHasCookie,
  ServerSetCookie,
  ServerSetCookie2
} from './action.func'

export const cookieServices = {
  ServerGetCookie,
  ServerSetCookie,
  ServerSetCookie2,
  ServerDeleteCookie,
  ServerHasCookie,
  setCookieWithToken,
  updateRefreshToken,
  getOptionWithAccessToken,
  getAccessTokenPayload
}

async function setCookieWithToken(name: string, token: string, value?: string) {
  const decode = decodeJwtToken(token)
  ServerSetCookie({
    name,
    value: value ? value : token,
    expires: new Date(decode.exp * 1000)
  })
}

interface IRefreshToken {
  accessToken: string
  refreshToken: string
}
async function updateRefreshToken(param: IRefreshToken) {
  const { accessToken, refreshToken } = param
  await setCookieWithToken('accessToken', accessToken)
  await setCookieWithToken('refreshToken', refreshToken)
}

async function getOptionWithAccessToken() {
  const result = {
    headers: {
      Authorization: ''
    }
  }
  if (typeof window === 'undefined') {
    const accessToken = await ServerGetCookie('accessToken')
    result.headers.Authorization = `Bearer ${accessToken}`
  } else {
    const refreshToken = await ServerGetCookie('refreshToken')
    const res = await http.post<LoginResponse>('/authen/refresh-token', { refreshToken })
    await updateRefreshToken(res.data)
    result.headers.Authorization = `Bearer ${res.data.accessToken}`
  }
  return result
}

async function getAccessTokenPayload() {
  const accessToken = await ServerGetCookie('accessToken')
  if (!accessToken) return null
  return decodeJwtToken(accessToken) as AccessTokenPayload
}
