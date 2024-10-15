import { JwtPayload } from '@/constants'
import { jwtDecode } from 'jwt-decode'

export const decodeJwtToken = (token: string): JwtPayload => {
  try {
    const decoded: JwtPayload = jwtDecode(token)
    return decoded
  } catch {
    throw new Error('Token không hợp lệ')
  }
}
