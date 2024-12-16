'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { authRequest, RegisterBodyType, RegisterFormSchema } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function RegisterForm() {
  // dialog
  const [isOpen, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  // 1. Define your form.
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
      isAcceptTerms: true,
      isStudent: false
    }
  })
  // handle loading
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    startLoading()
    try {
      const res = await authRequest.register(values)
      setEmail(values.email)
      setName(values.name)
      setOpen(true)
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Nhập tên' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Nhập số điện thoại' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='isAcceptTerms'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='terms' checked={field.value} onCheckedChange={field.onChange} />
                    <label
                      htmlFor='terms'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                    >
                      Tôi đồng ý với các điều khoản bảo mật cá nhân
                    </label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isStudent'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='isStudent'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor='isStudent'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cusor-pointer'
                    >
                      Tôi là Học sinh - sinh viên (nhận thêm ưu đãi tới 500k/ sản phẩm)
                    </label>
                  </div>
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
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đăng kí thành công</DialogTitle>
          </DialogHeader>
          <div>
            <p className='py-2'>
              Xin chào <span className='font-semibold'>{name}</span>, chúng tôi đã gửi một email xác
              nhận đến <span className='font-semibold'>{email}</span>. Vui lòng kiểm tra email của
              bạn để hoàn tất quá trình đăng ký, {''}
              <Link
                className='font-semibold text-blue-600 hover:text-blue-500'
                href='/verify-email'
              >
                click vào đây để xác tiếp tục
              </Link>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
