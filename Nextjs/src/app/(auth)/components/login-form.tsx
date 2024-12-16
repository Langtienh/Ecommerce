'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { authRequest, LoginBodyType, LoginFormSchema } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function LoginForm() {
  return (
    <Suspense>
      <HandleWithSearchParam />
    </Suspense>
  )
}

const HandleWithSearchParam = () => {
  const searchParam = useSearchParams()
  const redirectUrl = searchParam.get('redirectUrl') || '/smember'
  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  // 2. handle loading, store global state
  const router = useRouter()
  const setUser = useAccount((state) => state.setUser)
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 3. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    startLoading()
    try {
      const res = await authRequest.login(values)
      setUser(res.data.user)
      toast.success(res.message)
      // router.push(redirectUrl)
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
