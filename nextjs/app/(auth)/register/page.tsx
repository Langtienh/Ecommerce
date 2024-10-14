import Link from 'next/link'
import AuthLabel from '../components/auth-label'
import RegisterForm from '../components/register-form'

export default function Page() {
  return (
    <>
      <AuthLabel label='Đăng kí' />
      <RegisterForm />
      <p className='my-5 text-sm text-center'>
        Bạn đã có tài khoản?{' '}
        <Link href='/login' className='text-red-600 hover:text-red-500 font-bold'>
          Đăng nhập ngay
        </Link>
      </p>
    </>
  )
}
