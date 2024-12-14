import { cookieServices } from '@/lib/action'
import { http } from '@/lib/http'
import {
  LoginBodyType,
  RegisterBodyType,
  ResetPasswordBodyType,
  RestorePasswordBodyType,
  VerifyEmailBodyType,
  VerifyForgotPasswordOTPBodyType
} from './auth.schema'

const {
  ServerDeleteCookie,
  ServerGetCookie,
  getOptionWithAccessToken,
  setCookieWithToken,
  updateRefreshToken
} = cookieServices

class AuthRequest {
  async register(body: RegisterBodyType) {
    const res = await http.post<RegisterResponse>('/auth/register', body)
    await updateRefreshToken(res.data)
    await setCookieWithToken('verifyEmailToken', res.data.verifyEmailToken)
    return res
  }

  async login(body: LoginBodyType) {
    const res = await http.post<LoginResponse>('/auth/login', body)
    await updateRefreshToken(res.data)
    return res
  }

  async logout() {
    const accessTokenOption = await getOptionWithAccessToken()
    const refreshToken = await ServerGetCookie('refreshToken')
    await http.post('/auth/logout', { refreshToken }, accessTokenOption)
    await ServerDeleteCookie('accessToken')
    await ServerDeleteCookie('refreshToken')
  }

  async verifyEmail(body: VerifyEmailBodyType) {
    const res = await http.post<LoginResponse>('/auth/verify-email', body)
    await updateRefreshToken(res.data)
    await ServerDeleteCookie('verifyEmailToken')
    return res
  }

  async resendVerifyEmail() {
    const accessTokenOption = await getOptionWithAccessToken()
    const res = await http.get<{ verifyEmailToken: string }>('/auth/resend-verify-email', {
      ...accessTokenOption
    })
    await setCookieWithToken('verifyEmailToken', res.data.verifyEmailToken)
    return res
  }

  async restorePassword(body: RestorePasswordBodyType) {
    const res = await http.post<ForgotPasswordResponse>('/auth/password/send', body)
    await setCookieWithToken('forgotPasswordToken', res.data.forgotPasswordToken)
    return res
  }

  async verifyForgotPasswordOTP(body: VerifyForgotPasswordOTPBodyType, setCookie?: boolean) {
    const res = await http.post('/auth/password/verify-otp', body)
    if (res.statusCode === 201 && setCookie) {
      await setCookieWithToken('forgotPasswordToken', body.forgotPasswordToken)
      await setCookieWithToken('otp', body.forgotPasswordToken, body.otp)
    }
    return res
  }

  async resetPassword(body: ResetPasswordBodyType) {
    const res = await http.post<LoginResponse>('/auth/password/reset', body)
    if (res.statusCode === 201) {
      await updateRefreshToken(res.data)
      await ServerDeleteCookie('forgotPasswordToken')
    }
    return res
  }
}

export const authRequest = new AuthRequest()
