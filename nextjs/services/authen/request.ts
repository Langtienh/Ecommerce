import http from '@/lib/http'
import { ForgotPasswordReponse, LoginReponse, RegisterReponse } from '@/types/response'
import {
  getOptionWithAccessToken,
  refreshTokenTrigger,
  registerTrigger,
  resendVerifyEmailTrigger,
  resetPasswordTrigger,
  verifyEmailTrigger,
  verifyRestorePasswordOtpTrigger
} from '../cookies/authen'
import {
  LoginBodyType,
  RegisterBodyType,
  ResetPasswordBodyType,
  RestorePasswordBodyType,
  VerifyEmailBodyType,
  VerifyForgotPasswordOTPBodyType
} from './schema'

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
  await verifyEmailTrigger()
  return res
}

export const resendVerifyEmail = async () => {
  const accessTokenOption = await getOptionWithAccessToken()
  const res = await http.get<{ verifyEmailToken: string }>('/authentication/resend-verify-email', {
    ...accessTokenOption
  })
  await resendVerifyEmailTrigger(res.data.verifyEmailToken)
  return res
}

export const restorePassword = async (body: RestorePasswordBodyType) => {
  const res = await http.post<ForgotPasswordReponse>('/authentication/password/send', body)
  return res
}

export const verifyForgotPasswordOTP = async (body: VerifyForgotPasswordOTPBodyType, setCookie?: boolean) => {
  const res = await http.post<undefined>('/authentication/password/verify-otp', body)
  if (res.statusCode === 201 && setCookie) await verifyRestorePasswordOtpTrigger(body)
  return res
}

export const resendRestorePassword = async (email: string) => {
  const res = await http.post<ForgotPasswordReponse>('/authentication/password/resend', { email })
  return res
}

export const resetPassword = async (body: ResetPasswordBodyType) => {
  const res = await http.post<LoginReponse>('/authentication/password/reset', body)
  if (res.statusCode === 201) {
    await refreshTokenTrigger(res.data)
    await resetPasswordTrigger()
  }
  return res
}
