import { HeaderMain } from '@/components/header'
import { Metadata } from 'next'
import SmemberNav from './components/nav'
import SmemberNavMobile from './components/nav-mobile'

export const metadata: Metadata = {
  title: 'Smember | tri ân tích điểm đổi quà',
  description: 'Đăng ký tài khoản để nhận ưu đãi hấp dẫn từ Smember'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='h-16'></div>
      <main className='bg-[#f4f6f8] relative flex pt-5'>
        <SmemberNav />
        <div className='flex-1 p-[10px] mx-auto pb-[140px]'>{children}</div>
      </main>
      <HeaderMain className='fixed top-0 w-full' />
      <SmemberNavMobile />
    </>
  )
}
