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

export const RegisterFormSchema = z
  .object({
    name: z.string().trim().min(6, 'Tên tối thiểu 6 ký tự').max(63, 'Tên tối đa 63 ký tự'),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    phone: z.string().min(10, 'Không đúng định dạng số điện thoại').max(11, 'Không đúng định dạng số điện thoại'),
    password: passwordSchema,
    confirmPassword: z.string()
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

export type RegisterBodyType = z.infer<typeof RegisterFormSchema>
