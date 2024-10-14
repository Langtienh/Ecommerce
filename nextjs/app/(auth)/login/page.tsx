import Link from 'next/link'
import AuthLabel from '../components/auth-label'
import LoginForm from '../components/login-form'

export default function Page() {
  return (
    <>
      <AuthLabel label='Đăng nhập' />
      <LoginForm />
      <p className='my-5 text-sm text-center'>
        Bạn chưa có tài khoản?{' '}
        <Link href='/register' className='text-red-600 hover:text-red-500 font-bold'>
          Đăng ký ngay
        </Link>
      </p>
    </>
  )
}
