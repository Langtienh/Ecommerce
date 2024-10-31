import { z } from 'zod'

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
