import { AccessTokenPayload } from '@/constants'
import http from '@/lib/http'
import { decodeJwtToken } from '@/lib/jwt'
import { SDeleteCookie, SGetCookie, SHasCookie, SSetCookie, SSetCookie2 } from './server-action'

export const cookiesService = {
  SGetCookie,
  SSetCookie,
  SSetCookie2,
  SDeleteCookie,
  SHasCookie,
  setCookieWithToken,
  updateRefreshToken,
  getOptionWithAccessToken,
  getAccessTokenPayload
}

async function setCookieWithToken(name: string, token: string, value?: string) {
  const decode = decodeJwtToken(token)
  SSetCookie({
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
    const accessToken = await SGetCookie('accessToken')
    result.headers.Authorization = `Bearer ${accessToken}`
  } else {
    const refreshToken = await SGetCookie('refreshToken')
    const res = await http.post<LoginReponse>('/authentication/refresh-token', { refreshToken })
    await updateRefreshToken(res.data)
    result.headers.Authorization = `Bearer ${res.data.accessToken}`
  }
  return result
}

async function getAccessTokenPayload() {
  const accessToken = await SGetCookie('accessToken')
  if (!accessToken) return null
  return decodeJwtToken(accessToken) as AccessTokenPayload
}
