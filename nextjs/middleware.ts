import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const privatePaths = ['/dashboard', '/smember', '/cart']
const authPaths = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLogin = request.cookies.has('refreshToken')
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !isLogin) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && isLogin) {
    return NextResponse.redirect(new URL('/smember', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/smember/:path*', '/dashboard/:path*', '/cart/:path*']
}
