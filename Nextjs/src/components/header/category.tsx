import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn, imageSrc } from '@/lib/utils'
import Image from 'next/image'

interface CategoryProps {
  className?: string
}

export default function Category({ className }: CategoryProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex gap-2 items-center flex-nowrap shrink-0 p-2 bg-white bg-opacity-20 rounded-lg',
          className
        )}
      >
        <Image
          width={24}
          height={24}
          alt='categies'
          src={imageSrc('/header/category')}
          className='size-6 shrink-0'
        />
        <span className='text-xs text-nowrap'>Danh mục</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
