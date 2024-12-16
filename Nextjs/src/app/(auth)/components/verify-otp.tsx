'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import {
  authRequest,
  VerifyForgotPasswordOTPBodyType,
  verifyForgotPasswordOTPSchema
} from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface VerifyEmailFormProps {
  email: string
  forgotPasswordToken: string
  handleClose: () => void
}

export default function VerifyForgotPasswordOTPForm({
  email,
  forgotPasswordToken,
  handleClose
}: VerifyEmailFormProps) {
  const router = useRouter()
  const handleBack = () => router.back()
  const form = useForm<VerifyForgotPasswordOTPBodyType>({
    resolver: zodResolver(verifyForgotPasswordOTPSchema),
    defaultValues: {
      otp: '',
      forgotPasswordToken
    }
  })
  const { isLoading, startLoading, finallyLoading } = useLoading()
  const onSubmit = async (data: VerifyForgotPasswordOTPBodyType) => {
    startLoading()
    try {
      const res = await authRequest.verifyForgotPasswordOTP({ ...data, forgotPasswordToken }, true)
      toast.success(res.message)
      router.push('/restore-password')
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  const handlerError = (
    error: FieldErrors<{
      forgotPasswordToken: string
      otp: string
    }>
  ) => {
    toast.error(error.forgotPasswordToken?.message || error.otp?.message)
  }
  const handleResend = async () => {
    startLoading()
    try {
      const res = await authRequest.restorePassword({ email })
      form.setValue('forgotPasswordToken', res.data.forgotPasswordToken)
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  return (
    <Dialog
      open={!!forgotPasswordToken.length}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose()
      }}
    >
      <DialogContent className='sm:max-w-[425px] p-0 overflow-hidden'>
        <DialogHeader className='bg-[#f4f6f8] py-5'>
          <DialogTitle className='text-xl text-center'>Khôi phục mật khẩu</DialogTitle>
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
