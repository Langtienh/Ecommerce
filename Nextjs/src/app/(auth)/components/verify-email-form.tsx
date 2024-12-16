'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { authRequest, VerifyEmailBodyType, verifyEmailSchema } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface VerifyEmailFormProps {
  email: string
  verifyEmailToken?: string
}

export default function VerifyEmailForm({ email, verifyEmailToken }: VerifyEmailFormProps) {
  const router = useRouter()
  const handleBack = () => router.back()
  const form = useForm<VerifyEmailBodyType>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
      verifyEmailToken
    }
  })
  const { isLoading, startLoading, finallyLoading } = useLoading()
  const setUser = useAccount((state) => state.setUser)
  const onSubmit = async (data: VerifyEmailBodyType) => {
    startLoading()
    try {
      const res = await authRequest.verifyEmail(data)
      setUser(res.data.user)
      toast.success(res.message)
      router.push('/smember')
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  const handlerError = (
    error: FieldErrors<{
      verifyEmailToken: string
      otp: string
    }>
  ) => {
    toast.error(error.verifyEmailToken?.message || error.otp?.message)
  }
  const handleResend = async () => {
    startLoading()
    try {
      const res = await authRequest.resendVerifyEmail()
      form.setValue('verifyEmailToken', res.data.verifyEmailToken)
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  return (
    <Dialog open={true}>
      <DialogContent className='sm:max-w-[425px] p-0 overflow-hidden'>
        <DialogHeader className='bg-[#f4f6f8] py-5'>
          <DialogTitle className='text-xl text-center'>Xác thực email</DialogTitle>
        </DialogHeader>
        <div className='p-5 pb-20 w-full'>
          <p className='text-center text-lg'>
            Nhập mã OTP được gửi qua email <span className='font-semibold'>{email}</span>
          </p>
          <div className='flex justify-center py-5 w-full'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, handlerError)}
                className=' space-y-6 w-full'
              >
                <FormField
                  control={form.control}
                  name='otp'
                  render={({ field }) => (
                    <FormItem className='flex justify-center'>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isLoading}
                  size='lg'
                  variant='destructive'
                  type='submit'
                  className='w-full'
                >
                  Xác nhận
                </Button>
              </form>
            </Form>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <Button
              className='border-blue-600 text-blue-500'
              size='lg'
              variant='outline'
              onClick={handleBack}
            >
              Quay lại
            </Button>
            <Button
              className='border-blue-600 text-blue-500'
              size='lg'
              variant='outline'
              onClick={handleResend}
            >
              Gửi lại OTP
            </Button>
          </div>
          <p className='text-center text-gray-500 my-5'>Mã OTP có thời hạn 15 phút</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
