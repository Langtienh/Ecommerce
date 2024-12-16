import { ServerDeleteCookie, ServerGetCookie, updateRefreshToken } from '@/lib/action'
import { http } from '@/lib/http'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const redirectUrl = new URL(request.url).searchParams.get('redirectUrl') ?? '/home'
    let accessToken = await ServerGetCookie('accessToken')
    const refreshToken = await ServerGetCookie('refreshToken')
    if (!refreshToken) {
      Response.redirect(new URL('/login', request.url))
    } else if (!accessToken) {
      const res = await http.post<LoginResponse>('/auth/refresh-token', { refreshToken })
      accessToken = res.data.accessToken
      await updateRefreshToken(res.data)
    }
    return Response.redirect(new URL(redirectUrl, request.url))
  } catch {
    await ServerDeleteCookie('accessToken')
    await ServerDeleteCookie('refreshToken')
    return Response.redirect(new URL('/login', request.url))
  }
}
