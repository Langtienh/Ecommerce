import { HeaderMain } from '@/components/header'
import type { Metadata } from 'next'
import AuthNavigation from './components/navagation'

export const metadata: Metadata = {
  title: 'Smember | tri ân tích điểm đổi quà',
  description: 'Đăng ký tài khoản để nhận ưu đãi hấp dẫn từ Smember'
}

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderMain className='fixed top-0 w-full' />
      <div className='h-16'></div>
      <main className='max-w-[700px] px-[10px] mx-auto pb-[140px]'>
        <AuthNavigation />
        {children}
      </main>
    </>
  )
}
