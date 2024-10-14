import http from '@/lib/http'
import { LoginReponse, RegisterReponse } from '@/types/response'
import { LoginBodyType, RegisterBodyType } from './schema'

export const register = async (data: RegisterBodyType) => {
  const res = await http.post<RegisterReponse>('/authentication/register', data)
  return res
}

export const login = async (data: LoginBodyType) => {
  const res = await http.post<LoginReponse>('/authentication/login', data)
  return res
}
