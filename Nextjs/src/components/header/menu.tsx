'use client'
import useAccount from '@/hooks/use-account'
import useRequestLogin from '@/hooks/use-request-login'
import { cn, imageSrc } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import Auth from './auth'
import CartIcon from './cart'

interface MenuItemProps {
  className?: string
}

export default function Menu() {
  const user = useAccount((state) => state.user)
  const openHandle = useRequestLogin((state) => state.openHandle)
  const handleClick = (path: string) => openHandle(path)
  return (
    <>
      {menuItems.map((item, index) => {
        if (item.isAuthentication && !user)
          return (
            <Button
              onClick={() => handleClick(item.path)}
              variant='link'
              key={`${item}${index}`}
              className={cn(
                'text-white gap-2 items-center shrink-0 p-2 rounded-xl hover:bg-white hover:bg-opacity-10 hidden',
                item.hiddenOntablet ? 'lg:flex' : 'sm:flex'
              )}
            >
              {item.icon}
              <p className='text-xs no-underline'>{item.label}</p>
            </Button>
          )
        return (
          <Link
            href={item.path}
            key={`${item}${index}`}
            className={cn(
              'gap-2 items-center shrink-0 p-2 rounded-xl hover:bg-white hover:bg-opacity-10 hidden',
              item.hiddenOntablet ? 'lg:flex' : 'sm:flex'
            )}
          >
            {item.icon}
            <p className='text-xs'>{item.label}</p>
          </Link>
        )
      })}
      <Auth className='hidden sm:block' />
    </>
  )
}

const menuItems = [
  {
    label: (
      <>
        Gọi mua hàng <br /> 1800.2097
      </>
    ),
    path: 'tel:18002044',
    icon: (
      <Image
        width={24}
        height={24}
        alt='contact'
        src={imageSrc('/header/phone')}
        className='h-6 shrink-0 object-cover'
      />
    ),
    hiddenOntablet: true
  },
  {
    label: (
      <>
        Cửa hàng <br /> gần bạn
      </>
    ),
    path: '/about',
    icon: (
      <Image
        width={24}
        height={24}
        alt='about'
        src={imageSrc('/header/location')}
        className='h-6 shrink-0 object-cover'
      />
    ),
    hiddenOntablet: true
  },
  {
    label: (
      <>
        Tra cứu <br /> đơn hàng
      </>
    ),
    path: '/smember/invoices',
    icon: (
      <Image
        width={40}
        height={24}
        alt='invoice'
        src={imageSrc('/header/car')}
        className='h-6 shrink-0 object-cover'
      />
    ),
    hiddenOntablet: true,
    isAuthentication: true
  },
  {
    label: (
      <>
        Giỏ <br /> hàng
      </>
    ),
    path: '/cart',
    icon: <CartIcon />,
    hiddenOntablet: false,
    isAuthentication: true
  }
]
