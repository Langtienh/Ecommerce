import http from '@/lib/http'
import { RegisterReponse } from '@/types/response'
import { RegisterBodyType } from './schema'

export const register = async (data: RegisterBodyType) => {
  const res = await http.post<RegisterReponse>('/authentication/register', data)
  return res
}
