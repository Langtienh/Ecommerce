import http from '@/lib/http'
import { LoginReponse, RegisterReponse } from '@/types/response'
import { registerTrigger } from '../cookies'
import { getOptionWithAccessToken, refreshTokenTrigger, resendVerifyEmailTrigger } from '../cookies/authen'
import { LoginBodyType, RegisterBodyType, VerifyEmailBodyType } from './schema'

export const register = async (body: RegisterBodyType) => {
  const res = await http.post<RegisterReponse>('/authentication/register', body)
  await registerTrigger(res.data)
  return res
}

export const login = async (body: LoginBodyType) => {
  const res = await http.post<LoginReponse>('/authentication/login', body)
  await refreshTokenTrigger(res.data)
  return res
}

export const verifyEmail = async (body: VerifyEmailBodyType) => {
  const res = await http.post<LoginReponse>('/authentication/verify-email', body)
  await refreshTokenTrigger(res.data)
  return res
}

export const resendVerifyEmail = async () => {
  const accessTokenOption = await getOptionWithAccessToken()
  const res = await http.get<{ verifyEmailToken: string }>('/authentication/resend-verify-email', {
    ...accessTokenOption
  })
  console.log('resendVerifyEmail', res)
  await resendVerifyEmailTrigger(res.data.verifyEmailToken)
  return res
}
