import 'animate.css/animate.compat.css'
import type { Metadata } from 'next'
import './globals.css'

import { OverlayLoading } from '@/components/loading'
import { RedirectLoginModal } from '@/components/request-login-modal'
// import AuthTrigger from '@/components/trigger/auth-trigger'
import { Toaster } from '@/components/ui/sonner'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Welcome to ecommerce project',
  description: 'Technology stack: Next.js, Tailwind CSS, TypeScript, Nest.js, TyperORM, PostgreSQL'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        {/* <AuthTrigger /> */}
        {children}
        <OverlayLoading />
        <RedirectLoginModal />
        <Toaster position='top-center' richColors duration={2000} />
      </body>
    </html>
  )
}
