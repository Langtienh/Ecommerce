'use client'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { AiFillProduct } from 'react-icons/ai'
import {
  FaComments,
  FaConnectdevelop,
  FaHome,
  FaShopify,
  FaUser,
  FaUserShield
} from 'react-icons/fa'
import { GrResources } from 'react-icons/gr'
import { IoDocuments } from 'react-icons/io5'

export default function DashboardNav() {
  const path = usePathname()
  const isMathPath = (href: string) => {
    if (path === '/dashboard') return href === '/dashboard'
    return path.startsWith(href) && href !== '/dashboard'
  }
  return (
    <Card className='fixed top-0 bottom-0 left-0 overflow-auto flex flex-col space-y-1 p-2 rounded-none transition-width duration-500 ease-in-out hover:w-[200px] group text-sm'>
      <Link href='/home' className='flex gap-3 items-center'>
        <FaShopify size={40} className='dark:text-green-600 text-red-600' />
        <span className='hidden group-hover:block text-xl font-bold'>Ecommerce</span>
      </Link>
      <Separator />
      {menus.map((menu, index) => (
        <Fragment key={`menu-${index}`}>
          {menu.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                className={cn(
                  'flex gap-3 items-center p-[10px] rounded-sm bg-opacity-10 hover:bg-opacity-5 hover:bg-black hover:dark:bg-[#313131]',
                  isMathPath(item.href) && 'bg-black dark:bg-[#313131] hover:bg-opacity-10'
                )}
                href={item.href}
              >
                <Icon size={20} className='size-5' />{' '}
                <span className='hidden group-hover:block'>{item.label}</span>
              </Link>
            )
          })}
          <Separator />
        </Fragment>
      ))}
    </Card>
  )
}

const homeMenuItems = [
  {
    label: 'Bảng điều khiển',
    icon: FaHome,
    href: '/dashboard'
  }
]

const crudMenuItems = [
  {
    label: 'Người dùng',
    icon: FaUser,
    href: '/dashboard/users'
  },
  {
    label: 'Sản phẩm',
    icon: AiFillProduct,
    href: '/dashboard/products'
  },
  {
    label: 'Hóa đơn',
    icon: IoDocuments,
    href: '/dashboard/invoices'
  },
  {
    label: 'Bình luận',
    icon: FaComments,
    href: '/dashboard/comments'
  }
]

const authorMenuItems = [
  {
    label: 'Vai trò',
    icon: FaUserShield,
    href: '/dashboard/roles'
  },
  {
    label: 'Tài nguyên',
    icon: GrResources,
    href: '/dashboard/resources'
  },
  {
    label: 'Quyền',
    icon: FaConnectdevelop,
    href: '/dashboard/permissions'
  }
]

const menus = [homeMenuItems, authorMenuItems, crudMenuItems]
