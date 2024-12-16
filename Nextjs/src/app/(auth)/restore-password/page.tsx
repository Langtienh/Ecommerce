import { imageSrc } from '@/lib/utils'
import { authRequest } from '@/services/auth'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import ResetPasswordForm from '../components/reset-password-form'

export default async function Page() {
  const otp = cookies().get('otp')?.value
  const forgotPasswordToken = cookies().get('forgotPasswordToken')?.value
  if (!otp || !forgotPasswordToken) redirect('/home')
  try {
    await authRequest.verifyForgotPasswordOTP({ forgotPasswordToken, otp })
    return (
      <>
        <div className='mt-5 mb-10 flex flex-col justify-center space-y-2 items-center'>
          <Image width={100} height={100} alt='shipper' src={imageSrc('/shipper')} />
          <h3>Tạo mật khẩu mới</h3>
        </div>
        <ResetPasswordForm otp={otp} forgotPasswordToken={forgotPasswordToken} />
      </>
    )
  } catch {
    redirect('/home')
  }
}
