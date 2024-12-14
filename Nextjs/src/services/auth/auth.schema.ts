import { z } from 'zod'
import { emailSchema, nameSchema, passwordSchema, phoneSchema } from '../user'

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
