import { COOKIES_OPTIONS } from '@/constants'
import http from '@/lib/http'
import { decodeJwtToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const redirectUrl = new URL(request.url).searchParams.get('redirectUrl') || '/'
    let accessToken = await cookies().get('accessToken')?.value
    const refreshToken = await cookies().get('refreshToken')?.value
    if (!refreshToken) {
      Response.redirect(new URL('/login', request.url))
    } else if (!accessToken) {
      const res = await http.post<LoginReponse>('/authentication/refresh-token', { refreshToken })
      accessToken = res.data.accessToken
      const accessTokenPayload = decodeJwtToken(accessToken)
      const refreshTokenPayload = decodeJwtToken(refreshToken)
      cookies().set({
        ...COOKIES_OPTIONS,
        name: 'accessToken',
        value: accessToken,
        expires: new Date(accessTokenPayload.exp * 1000)
      })
      cookies().set({
        ...COOKIES_OPTIONS,
        name: 'refreshToken',
        value: res.data.refreshToken,
        expires: new Date(refreshTokenPayload.exp * 1000)
      })
    }
    return Response.redirect(new URL(redirectUrl, request.url))
  } catch {
    cookies().delete('accessToken')
    cookies().delete('refreshToken')
    return Response.redirect(new URL('/login', request.url))
  }
}
