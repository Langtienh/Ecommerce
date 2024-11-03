import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { imageSrc } from '@/lib/utils'
import Image from 'next/image'

export default function Welcome() {
  return (
    <>
      {images.data.map((item, index) => (
        <Card
          key={item.title}
          className='w-[360px] p-3 flex flex-col justify-between gap-3 hover:shadow-zinc-50 cursor-pointer'
        >
          <CardContent className='p-0 px-2'>
            <div className='w-[320px] overflow-hidden'>
              <AspectRatio ratio={16 / 9}>
                <Image
                  className='object-cover rounded-xl '
                  width={384}
                  height={216}
                  src={imageSrc(images.prefix + item.url + images.suffix)}
                  alt={item.title}
                />
              </AspectRatio>
            </div>
          </CardContent>
          <CardHeader className='p-0'>
            <CardTitle className='font-bold text-xl'>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
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
