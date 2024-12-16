'use client'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { serverRedirect } from '@/lib/action'
import { cn } from '@/lib/utils'
import { authRequest } from '@/services/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaGift, FaShopify, FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { PiStudent } from 'react-icons/pi'
import { SiAdguard } from 'react-icons/si'
import { toast } from 'sonner'

export default function SmemberNav() {
  const path = usePathname()
  const isMatchPath = (href: string) => {
    if (path === '/smember') return href === '/smember'
    return path.startsWith(href) && href !== '/smember'
  }
  const removeUser = useAccount((state) => state.removeUser)
  const { startLoading, finallyLoading } = useLoading()
  const handleLogout = async () => {
    startLoading()
    try {
      await authRequest.logout()
      toast.success('Đăng xuất thành công')
    } finally {
      removeUser()
      finallyLoading()
      await serverRedirect('/login')
    }
  }
  return (
    <div className='hidden sm:flex flex-col space-y-3 p-[10px] w-[250px] sticky h-min top-20 text-[#686868] rounded-xl bg-[#f6fbfc]'>
      {menuItems.map((item) => (
        <Link
          className={cn(
            'flex items-center gap-3 py-2 px-3 border rounded-xl border-[#f6fbfc]',
            isMatchPath(item.href) && 'border-red-600 text-red-600 bg-[#ffeeee]'
          )}
          key={item.href}
          href={item.href}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
      <span onClick={handleLogout} className='cursor-pointer flex items-center gap-3 py-1 px-3'>
        <FiLogOut size={24} />
        <span>Thoát tài khoản</span>
      </span>
    </div>
  )
}

const menuItems = [
  {
    title: 'Tổng quan',
    icon: <FaShopify size={24} />,
    href: '/smember'
  },
  {
    title: 'Lịch sử mua hàng',
    icon: <HiOutlineClipboardDocumentList size={24} />,
    href: '/smember/invoices'
  },
  {
    title: 'Ưu đãi của bạn',
    icon: <FaGift size={24} />,
    href: '/smember/offers'
  },
  {
    title: 'Tra cứu bảo hành',
    icon: <SiAdguard size={24} />,
    href: '/smember/warranty'
  },
  {
    title: 'Chương trình S-Student',
    icon: <PiStudent size={24} />,
    href: '/smember/student'
  },
  {
    title: 'Tài khoản của bạn',
    icon: <FaUser size={24} />,
    href: '/smember/account'
  }
]
