import { ThemeProvider } from '@/components/theme/theme-provider'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-dropdown-menu'
import GetStated from './login-demo'
import Welcome from './welcome'

export default function Home() {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
        <div className='w-screen pt-20 pb-20 bg-primary-foreground flex flex-col justify-center items-center'>
          <CardHeader className='text-center max-w-6xl'>
            <CardTitle className='text-4xl font-bold'>Welcome to Ecommerce project</CardTitle>
            <CardDescription className='text-xl'>
              Công nghệ sử dụng: Next.js, Tailwind CSS, TypeScript, Nest.js, TyperORM, PostgreSQL, ShaCn UI
            </CardDescription>
            <CardDescription className='text-xl'>
              Dự án này được xây dựng với mục đích học tập và nghiên cứu về các công nghệ để xây dựng nên 1 trang web
              bán hàng hoàn chỉnh, đầy đủ chức năng, hiệu quả an toàn và có tính mở rộng cao.
            </CardDescription>
            <GetStated />
          </CardHeader>
        </div>
        <h1 className='my-5 text-center'>Có gì trong Ecommerce project?</h1>
        <Separator className='w-1/2 mx-auto mb-5' />
        <div className='max-w-7xl w-full mx-auto flex flex-wrap justify-center gap-3 p-5'>
          <Welcome />
        </div>
      </ThemeProvider>
    </>
  )
}
