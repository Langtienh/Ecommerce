import { HeaderMain, MenuMobile } from '@/components/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderMain className='fixed top-0 w-full' />
      <div className='h-16'></div>
      <main className='bg-[#f4f6f8] max-w-[1200px] px-[10px] mx-auto pb-[140px]'></main>
      <MenuMobile />
    </>
  )
}
