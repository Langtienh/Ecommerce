import http from '@/lib/http'
import { z } from 'zod'
import { cookiesService } from './core/cookie-services'

export const passwordSchema = z
  .string()
  .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  .max(63, { message: 'Mật khẩu không được dài quá 63 ký tự' })
  .regex(/[A-Z]/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa'
  })
  .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất một số' })
  .regex(/[^A-Za-z0-9]/, {
    message: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'
  })

export const emailSchema = z.string().email({ message: 'Email không hợp lệ' })
export const nameSchema = z.string().trim().min(6, 'Tên tối thiểu 6 ký tự').max(63, 'Tên tối đa 63 ký tự')
export const phoneSchema = z
  .string()
  .min(10, 'Không đúng định dạng số điện thoại')
  .max(11, 'Không đúng định dạng số điện thoại')

export const RegisterFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    isAcceptTerms: z.boolean(),
    isStudent: z.boolean()
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
      })
    }
    if (data.isAcceptTerms !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Vui lòng chấp nhận điều khoản sử dụng',
        path: ['isAcceptTerms']
      })
    }
  })

export type RegisterBodyType = z.infer<typeof RegisterFormSchema>

export const LoginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export type LoginBodyType = z.infer<typeof LoginFormSchema>

export const RestorePasswordSchema = z.object({
  email: emailSchema
})

export type RestorePasswordBodyType = z.infer<typeof RestorePasswordSchema>

export const verifyEmailSchema = z.object({
  verifyEmailToken: z.string({ message: 'OTP hêt hạn, vui lòng gửi lại!' }),
  otp: z.string().length(6, 'Mã OTP phải có 6 ký tự')
})

export type VerifyEmailBodyType = z.infer<typeof verifyEmailSchema>

export const verifyForgotPasswordOTPSchema = z.object({
  forgotPasswordToken: z.string(),
  otp: z.string().length(6, 'Mã OTP phải có 6 ký tự')
})

export type VerifyForgotPasswordOTPBodyType = z.infer<typeof verifyForgotPasswordOTPSchema>

export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
    otp: z.string().length(6, 'Mã OTP phải có 6 ký tự'),
    forgotPasswordToken: z.string()
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
      })
    }
  })

export type ResetPasswordBodyType = z.infer<typeof ResetPasswordSchema>

const { SDeleteCookie, SGetCookie, getOptionWithAccessToken, setCookieWithToken, updateRefreshToken } = cookiesService
const authenRequestApi = {
  register: async (body: RegisterBodyType) => {
    const res = await http.post<RegisterReponse>('/authentication/register', body)
    await setCookieWithToken('verifyEmailToken', res.data.verifyEmailToken)
    return res
  },

  login: async (body: LoginBodyType) => {
    const res = await http.post<LoginReponse>('/authentication/login', body)
    await updateRefreshToken(res.data)
    return res
  },

  logout: async () => {
    const accessTokenOption = await getOptionWithAccessToken()
    const refreshToken = await SGetCookie('refreshToken')
    await http.post('/authentication/logout', { refreshToken }, accessTokenOption)
    await SDeleteCookie('accessToken')
    await SDeleteCookie('refreshToken')
  },

  verifyEmail: async (body: VerifyEmailBodyType) => {
    const res = await http.post<LoginReponse>('/authentication/verify-email', body)
    await updateRefreshToken(res.data)
    await SDeleteCookie('verifyEmailToken')
    return res
  },

  resendVerifyEmail: async () => {
    const accessTokenOption = await getOptionWithAccessToken()
    const res = await http.get<{ verifyEmailToken: string }>('/authentication/resend-verify-email', {
      ...accessTokenOption
    })
    await setCookieWithToken('verifyEmailToken', res.data.verifyEmailToken)
    return res
  },

  restorePassword: async (body: RestorePasswordBodyType) => {
    const res = await http.post<ForgotPasswordReponse>('/authentication/password/send', body)
    await setCookieWithToken('forgotPasswordToken', res.data.token)
    return res
  },

  verifyForgotPasswordOTP: async (body: VerifyForgotPasswordOTPBodyType, setCookie?: boolean) => {
    const res = await http.post('/authentication/password/verify-otp', body)
    if (res.statusCode === 201 && setCookie) {
      await setCookieWithToken('forgotPasswordToken', body.forgotPasswordToken)
      await setCookieWithToken('otp', body.forgotPasswordToken, body.otp)
    }
    return res
  },

  resendRestorePassword: async (email: string) => {
    const res = await http.post<ForgotPasswordReponse>('/authentication/password/resend', { email })
    await setCookieWithToken('forgotPasswordToken', res.data.token)
    return res
  },

  resetPassword: async (body: ResetPasswordBodyType) => {
    const res = await http.post<LoginReponse>('/authentication/password/reset', body)
    if (res.statusCode === 201) {
      await updateRefreshToken(res.data)
      await SDeleteCookie('forgotPasswordToken')
    }
    return res
  }
}

export default authenRequestApi
