'use client'

import { useLoading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleErrorApi } from '@/lib/handle-request'
import { delayForm } from '@/lib/utils'
import { login } from '@/services/authen/request'
import { LoginBodyType, LoginFormSchema } from '@/services/authen/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function LoginForm() {
  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  // handle loading
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    startLoading()
    try {
      const res = await login(values)
      await delayForm()
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập email' type='email' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập mật khẩu' type='password' {...field} />
              </FormControl>
              <div className='flex'>
                <Link
                  href='/restore-password-method'
                  className='m-2 text-end ms-auto text-[13px] text-gray-600 hover:text-gray-500'
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type='submit' variant='destructive' className='w-full'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
