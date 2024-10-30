import { COOKIES_OPTIONS } from '@/constants'
import { decodeJwtToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const redirectUrl = cookies().get('redirectUrl')?.value || '/smember'
    const accessToken = new URL(request.url).searchParams.get('accessToken')
    const refreshToken = new URL(request.url).searchParams.get('accessToken')
    if (!accessToken || !refreshToken) return Response.redirect(new URL('/login', request.url))
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
      value: refreshToken,
      expires: new Date(refreshTokenPayload.exp * 1000)
    })
    return Response.redirect(new URL(redirectUrl, request.url))
  } catch {
    cookies().delete('accessToken')
    cookies().delete('refreshToken')
    return Response.redirect(new URL('/login', request.url))
  }
}
