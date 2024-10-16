'use client'
import { useLoading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleErrorApi } from '@/lib/handle-request'
import { delayForm } from '@/lib/utils'
import { restorePassword } from '@/services/authen/request'
import { RestorePasswordBodyType, RestorePasswordSchema } from '@/services/authen/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import VerifyForgotPasswordOTPForm from '../components/verify-otp'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')

  const handleClose = () => setIsOpen(false)
  // 1. Define your form.
  const form = useForm<RestorePasswordBodyType>({
    resolver: zodResolver(RestorePasswordSchema),
    defaultValues: {
      email: ''
    }
  })
  // handle loading
  const { isLoading, startLoading, finallyLoading } = useLoading()
  const onSubmit = async (values: RestorePasswordBodyType) => {
    startLoading()
    try {
      const res = await restorePassword(values)
      await delayForm()
      toast.success(res.message)
      setEmail(values.email)
      setToken(res.data.token)
      setIsOpen(true)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }

  return (
    <>
      <div className='flex flex-col space-y-2 items-center justify-center mb-5'>
        <Image src='/images/shipper.png' width={100} height={100} alt='shipper' />
        <h3>Quên mật khẩu</h3>
        <p className='text-[13px] text-gray-500'>
          Hãy nhập email của bạn vào bên dưới để bắt đầu quá trình khôi phục mật khẩu.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập email của bạn' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} variant='destructive' className='w-full' type='submit'>
            Tiếp tục
          </Button>
        </form>
      </Form>
      <VerifyForgotPasswordOTPForm handleClose={handleClose} open={isOpen} email={email} forgotPasswordToken={token} />
    </>
  )
}
