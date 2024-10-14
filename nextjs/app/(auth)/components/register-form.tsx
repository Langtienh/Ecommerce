'use client'

import { useLoading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleErrorApi } from '@/lib/handle-request'
import { delayForm } from '@/lib/utils'
import { register } from '@/services/authen/request'
import { RegisterBodyType, RegisterFormSchema } from '@/services/authen/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterForm() {
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
      const res = await register(values)
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
                <Input placeholder='Nhập lại mật khẩu' type='password' {...field} />
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
                  <Checkbox id='isStudent' checked={field.value} onCheckedChange={field.onChange} />
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
  )
}
