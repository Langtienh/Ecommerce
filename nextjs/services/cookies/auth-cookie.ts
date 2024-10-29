'use server'

import { AccessTokenPayload, COOKIES_OPTIONS } from '@/constants'
import http from '@/lib/http'
import { decodeJwtToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { VerifyForgotPasswordOTPBodyType } from '../authen/schema'

export const getRefreshToken = async () => {
  return await cookies().get('refreshToken')?.value
}

export const registerTrigger = async (data: RegisterReponse) => {
  const verifyEmailTokenPayload = decodeJwtToken(data.verifyEmailToken)
  await refreshTokenTrigger(data)
  cookies().set({
    ...COOKIES_OPTIONS,
    name: 'verifyEmailToken',
    value: data.verifyEmailToken,
    expires: new Date(verifyEmailTokenPayload.exp * 1000)
  })
}

export const verifyEmailTrigger = async () => {
  cookies().delete('verifyEmailToken')
}

export const refreshTokenTrigger = async ({
  accessToken,
  refreshToken
}: {
  accessToken: string
  refreshToken: string
}) => {
  const accessTokenPayload = decodeJwtToken(accessToken)
  const refreshTokenPayload = decodeJwtToken(refreshToken)
  cookies().set({
    ...COOKIES_OPTIONS,
    name: 'accessToken',
    value: accessToken,
    expires: new Date(accessTokenPayload.exp * 1000)
  })
  cookies().set({
    ...COOKIES_OPTIONS,
    name: 'refreshToken',
    value: refreshToken,
    expires: new Date(refreshTokenPayload.exp * 1000)
  })
}

export const logoutTrigger = async () => {
  cookies().delete('accessToken')
  cookies().delete('refreshToken')
}

export const refreshTokenRequest = async (refreshToken: string) => {
  const res = await http.post<LoginReponse>('/authentication/refresh-token', { refreshToken })
  await refreshTokenTrigger(res.data)
  return res
}

export const getAccessTokenPayload = async () => {
  let accessToken = await cookies().get('accessToken')?.value
  const refreshToken = await cookies().get('refreshToken')?.value
  if (!refreshToken) {
    return null
  } else if (!accessToken) {
    const res = await refreshTokenRequest(refreshToken)
    accessToken = res.data.accessToken
  }
  const accessTokenPayload = decodeJwtToken(accessToken)
  return accessTokenPayload as AccessTokenPayload
}

export const serverGetOptionWithAccessToken = async () => {
  let accessToken = await cookies().get('accessToken')?.value
  const refreshToken = await cookies().get('refreshToken')?.value
  if (!refreshToken) {
    redirect('/login')
  } else if (!accessToken) {
    const res = await refreshTokenRequest(refreshToken)
    accessToken = res.data.accessToken
  }
  await refreshTokenTrigger({ accessToken, refreshToken })
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
}

export const resendVerifyEmailTrigger = async (token: string) => {
  const verifyEmailTokenPayload = decodeJwtToken(token)
  cookies().set({
    ...COOKIES_OPTIONS,
    name: 'verifyEmailToken',
    value: token,
    expires: new Date(verifyEmailTokenPayload.exp * 1000)
  })
}

export const verifyRestorePasswordOtpTrigger = async ({
  forgotPasswordToken,
  otp
}: VerifyForgotPasswordOTPBodyType) => {
  const verifyEmailTokenPayload = decodeJwtToken(forgotPasswordToken)
  cookies().set({
    ...COOKIES_OPTIONS,
    name: 'forgotPasswordToken',
    value: forgotPasswordToken,
    expires: new Date(verifyEmailTokenPayload.exp * 1000)
  })
  cookies().set({
    ...COOKIES_OPTIONS,
    name: 'otp',
    value: otp,
    expires: new Date(verifyEmailTokenPayload.exp * 1000)
  })
}

export const resetPasswordTrigger = async () => {
  cookies().delete('forgotPasswordToken')
  cookies().delete('otp')
}

export const checkAuthentication = async () => {
  return cookies().has('refreshToken')
}

export const isLogin = async () => {
  return cookies().has('refreshToken')
}

export const serverGetCookies = async (name: string) => {
  return cookies().get(name)?.value
}
