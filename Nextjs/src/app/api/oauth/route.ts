import { ServerDeleteCookie, ServerGetCookie, setCookieWithToken } from '@/lib/action'

export async function GET(request: Request) {
  try {
    const redirectUrl = (await ServerGetCookie('redirectUri')) ?? '/home'
    const accessToken = new URL(request.url).searchParams.get('accessToken')
    const refreshToken = new URL(request.url).searchParams.get('accessToken')
    if (!accessToken || !refreshToken) return Response.redirect(new URL('/login', request.url))
    await setCookieWithToken('accessToken', accessToken)
    await setCookieWithToken('refreshToken', refreshToken)
    await ServerDeleteCookie('redirectUri')
    return Response.redirect(new URL(redirectUrl, request.url))
  } catch {
    await ServerDeleteCookie('accessToken')
    await ServerDeleteCookie('refreshToken')
    return Response.redirect(new URL('/login', request.url))
  }
}
