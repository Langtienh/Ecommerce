'use server'

import { AccessTokenPayload, COOKIES_OPTIONS } from '@/constants'
import { decodeJwtToken } from '@/lib/jwt'
import { RegisterReponse } from '@/types/response'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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
  cookies().set({
    ...COOKIES_OPTIONS,
    name: 'accessTokenPayload',
    value: JSON.stringify(accessTokenPayload),
    expires: new Date(accessTokenPayload.exp * 1000)
  })
}

export const getAccessTokenPayload = async () => {
  const accessTokenPayloadCookies = await cookies().get('accessTokenPayload')?.value
  if (!accessTokenPayloadCookies) return null
  const accessTokenPayload: AccessTokenPayload = JSON.parse(accessTokenPayloadCookies)
  return accessTokenPayload
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
