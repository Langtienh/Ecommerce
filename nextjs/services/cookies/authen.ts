'use server'

import { AccessTokenPayload, COOKIES_OPTIONS } from '@/constants'
import { decodeJwtToken } from '@/lib/jwt'
import { RegisterReponse } from '@/types/response'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { VerifyForgotPasswordOTPBodyType } from '../authen/schema'

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

export const getAccessTokenPayload = async () => {
  const accessToken = await cookies().get('accessToken')?.value
  if (!accessToken) return null
  const accessTokenPayload = decodeJwtToken(accessToken)
  return accessTokenPayload as AccessTokenPayload
}

export const getOptionWithAccessToken = async () => {
  const accessToken = await cookies().get('accessToken')?.value
  if (!accessToken) redirect('/login')
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
