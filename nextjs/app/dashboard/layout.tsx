import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme/theme-provider'
import DashBoardHeader from './header'
import DashboardNav from './navagation'

export const metadata: Metadata = {
  title: 'Bảng điều khiển',
  description: 'Bảng điều khiển'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <div className='h-12'></div>
        <div className='flex'>
          <div className='w-14 shrink-0'></div>
          <main className='flex-1 shrink-0'>{children}</main>
        </div>
        <DashBoardHeader />
        <DashboardNav />
      </ThemeProvider>
    </div>
  )
}
