'use client'
import useAccount from '@/hooks/use-account'
import useRequestLogin from '@/hooks/use-request-login'
import { LucideMenuSquare } from 'lucide-react'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { FcShipped } from 'react-icons/fc'
import AuthMobile from './auth-mobile'
import CartIcon from './cart'

export function MenuMobile() {
  const user = useAccount((state) => state.user)
  const openHandle = useRequestLogin((state) => state.openHandle)
  const handleClick = (path: string) => openHandle(path)
  return (
    <div className='h-[60px] p-[5px] fixed bottom-0 left-0 w-screen bg-white shadow-sm flex sm:hidden justify-between items-center *:flex-1 *:flex *:flex-col gap-1 *:items-center *:justify-center'>
      {menuItems.map((item, index) => {
        if (item.isAuthentication && !user)
          return (
            <span
              className='cursor-pointer'
              onClick={() => handleClick(item.path)}
              key={`${item}${index}`}
            >
              {item.icon}
              <p className='text-xs no-underline'>{item.label}</p>
            </span>
          )
        return (
          <Link key={index} href={item.path}>
            {item.icon}
            <p className='text-xs'>{item.label}</p>
          </Link>
        )
      })}
      <AuthMobile />
    </div>
  )
}

const menuItems = [
  {
    label: 'Trang chủ',
    path: '/home',
    icon: <FaHome size={20} />
  },
  {
    label: 'Danh mục',
    icon: <LucideMenuSquare size={20} />,
    path: '/categories'
  },
  {
    label: 'Đơn hàng',
    path: '/smember/invoices',
    icon: <FcShipped size={20} />,
    isAuthentication: true
  },
  {
    label: 'Giỏ hàng',
    path: '/cart',
    icon: <CartIcon />,
    isAuthentication: true
  }
]
