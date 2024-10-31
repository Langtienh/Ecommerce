'use client'
import { AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import envConfig from '@/config'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { imageSrc } from '@/lib/utils'
import authenRequestApi from '@/services/authen/authen-request'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ScrollAnimation from 'react-animate-on-scroll'
import { FaGithub } from 'react-icons/fa'
import { toast } from 'sonner'

export default function Welcome() {
  return (
    <>
      {images.data.map((item, index) => (
        <ScrollAnimation
          key={item.title}
          delay={50}
          animateIn={index % 2 === 1 ? 'wobble' : undefined}
          initiallyVisible={true}
          animatePreScroll
        >
          <Card className='w-[360px] p-3 flex flex-col justify-between gap-3 hover:shadow-zinc-50 cursor-pointer'>
            <CardContent className='p-0'>
              <Image
                className='w-full h-[216px] object-contain rounded-xl px-5'
                width={384}
                height={216}
                src={imageSrc(images.prefix + item.url + images.suffix)}
                alt={item.title}
              />
            </CardContent>
            <CardHeader className='p-0'>
              <CardTitle className='font-bold text-xl'>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        </ScrollAnimation>
      ))}
    </>
  )
}

export const GetStated = () => {
  const router = useRouter()
  const setUser = useAccount((state) => state.setUser)
  const { startLoading, finallyLoading } = useLoading()
  const handleLogin = async () => {
    startLoading()
    try {
      const email = envConfig.ADMIN_EMAIL
      const password = envConfig.ADMIN_PASSWORD
      const data = { email, password }
      const res = await authenRequestApi.login(data)
      setUser(res.data.user)
      toast.success(res.message)
      router.push('/dashboard/roles')
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      finallyLoading()
    }
  }
  return (
    <div className='py-4 flex justify-center items-center gap-5'>
      <Button size='lg' variant='outline' asChild>
        <Link rel='noopener noreferrer' target='_blank' href='https://github.com/Langtienh/Ecommerce'>
          <FaGithub className='mr-2' />
          Source code
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size='lg'>Get started</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đăng ký người dùng mới</AlertDialogTitle>
            <AlertDialogDescription>
              Nhiều chức năng thú vị hơn với vai trò admin, chúng tôi cung cấp tài khoản admin demo sẵn, hoặc bạn có thể
              đăng ký tài khoản mới(với email của bạn)
            </AlertDialogDescription>
            <AlertDescription>Tiếp tục với</AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Link href='/register'>Tài khoản mới</Link>
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogin}>Admin account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// chức năng và hình ảnh demo
const images = {
  prefix: '/demo/',
  suffix: '.png',
  data: [
    {
      title: 'Permission-based Authorization',
      description: 'Phân quyền dựa trên vai trò và quyền hạn',
      url: 'manager-resource'
    },
    {
      title: 'Bảng điều khiển',
      description: 'Kiểm tra tài nguyên nhanh chóng và dễ dàng',
      url: 'dashboard'
    },
    {
      title: 'Authentication',
      description: 'Kiểm tra đăng nhập dự trên cơ chế jwt, hỗ trợ đăng nhập bằng tài khoản google, github',
      url: 'authentication'
    },
    {
      title: 'API Docs',
      description: 'Tài liệu backend đầy đủm rõ ràng',
      url: 'api-docs'
    },
    {
      title: 'Database',
      description: 'Thiết kế database đơn giản nhưng có thế mở rộng',
      url: 'database'
    },
    {
      title: 'Dark mode',
      description: 'Hỗ trợ dark-mode',
      url: 'dark-mode'
    },
    {
      title: 'Gửi email',
      description: 'Gửi mail, nhằm hỗ trợ người dùng tốt hơn',
      url: 'mailer'
    },
    {
      title: 'Upload file',
      description: 'Hỗ trợ upload',
      url: 'upload'
    },
    {
      title: 'Chức năng tìm kiếm sản phẩm',
      description: 'Giúp người dùng tìm kiêm sản phâm dễ dàng',
      url: 'search-product'
    },
    {
      title: 'Thanh toán với VNPay',
      description: 'Demo chức năng thanh toán bằng vnPay',
      url: 'vn-pay'
    },
    {
      title: 'Cart',
      description: 'Chức năng giỏ hang',
      url: 'cart'
    },
    {
      title: 'Checkout',
      description: 'Thanh toán khi nhận hàng hoặc bằng tài khoản vnPay',
      url: 'checkout'
    }
  ]
}
