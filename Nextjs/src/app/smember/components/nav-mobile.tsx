'use client'
import CartIcon from '@/components/header/cart'
import useAccount from '@/hooks/use-account'
import useRequestLogin from '@/hooks/use-request-login'
import Link from 'next/link'
import { FaHome, FaShopify, FaUserAlt } from 'react-icons/fa'
import { FcShipped } from 'react-icons/fc'

export default function SmemberNavMobile() {
  const user = useAccount((state) => state.user)
  const openHandle = useRequestLogin((state) => state.openHandle)
  const handleClick = (path: string) => openHandle(path)
  return (
    <div className='h-[60px] p-[5px] fixed bottom-0 left-0 w-screen bg-white shadow-sm flex sm:hidden justify-between items-center *:flex-1 *:flex *:flex-col gap-1 *:items-center *:justify-center'>
      {menuItems.map((item, index) => (
        <Link key={index} href={item.path}>
          {item.icon}
          <p className='text-xs'>{item.label}</p>
        </Link>
      ))}
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
    label: 'Tổng quan',
    path: '/smember',
    icon: <FaShopify className='text-red-600' size={20} />
  },
  {
    label: 'Đơn hàng',
    path: '/smember/invoices',
    icon: <FcShipped size={20} />
  },
  {
    label: 'Giỏ hàng',
    path: '/cart',
    icon: <CartIcon />
  },
  {
    label: 'Tài khoản',
    path: '/smember/account',
    icon: <FaUserAlt size={20} />
  }
]
