import { serverGetCookies, serverGetOptionWithAccessToken } from './cookies/auth-cookie'

export const getOptionWithAccessToken = async () => {
  // môi trường server không có window
  if (typeof window === 'undefined') {
    const accessToken = await serverGetCookies('accessToken')
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }
  return serverGetOptionWithAccessToken()
}
