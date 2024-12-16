'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { authRequest, ResetPasswordBodyType, ResetPasswordSchema } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface ResetPasswordFormProps {
  otp: string
  forgotPasswordToken: string
}

export default function ResetPasswordForm({ forgotPasswordToken, otp }: ResetPasswordFormProps) {
  // 1. Define your form.
  const form = useForm<ResetPasswordBodyType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      otp,
      forgotPasswordToken
    }
  })
  // handle loading
  const { isLoading, startLoading, finallyLoading } = useLoading()
  const setUser = useAccount((state) => state.setUser)
  const router = useRouter()
  // 2. Define a submit handler.
  async function onSubmit(values: ResetPasswordBodyType) {
    startLoading()
    try {
      const res = await authRequest.resetPassword(values)
      setUser(res.data.user)
      toast.success(res.message)
      router.push('/smember')
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Nhập mật khẩu mới của bạn' type='password' {...field} />
                </FormControl>
                <FormDescription>
                  (*) Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt và dài ít nhất
                  6 ký tự
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Xác nhận lại mật khẩu' type='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type='submit' variant='destructive' className='w-full'>
            Đăng ký
          </Button>
        </form>
      </Form>
    </>
  )
}
