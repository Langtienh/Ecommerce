import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FaShopify } from 'react-icons/fa'
import Category from './category'
import Menu from './menu'
import Search from './search'
interface HeaderMainProps {
  className?: string
}
export function HeaderMain({ className }: HeaderMainProps) {
  return (
    <div className={cn('h-16 bg-red-600 shadow-sm', className)}>
      <div className='w-full h-full px-3 mx-auto text-white flex justify-between items-center gap-3'>
        <Link href='/home'>
          <h2 className='hidden md:block'>Ecommerce</h2>
          <FaShopify className='w-9 md:hidden' size={36} />
        </Link>
        <Category className='hidden sm:flex' />
        <Search className='w-full' />
        <Menu />
      </div>
    </div>
  )
}
