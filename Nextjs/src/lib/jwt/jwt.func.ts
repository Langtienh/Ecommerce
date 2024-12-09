import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from './jwt.type'

export const decodeJwtToken = (token: string): JwtPayload => {
  try {
    const decoded: JwtPayload = jwtDecode(token)
    return decoded
  } catch {
    throw new Error('Token không hợp lệ')
  }
}
