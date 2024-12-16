'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { cn, getFirstLetterUppercase } from '@/lib/utils'
import { authRequest } from '@/services/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaShopify, FaUser } from 'react-icons/fa'
import { MdDashboardCustomize, MdLogout } from 'react-icons/md'
import { toast } from 'sonner'
import AvatarUser from '../avatar-user'
import { Button } from '../ui/button'
interface AuthProps {
  className?: string
}
export default function Auth({ className }: AuthProps) {
  const router = useRouter()
  const user = useAccount((state) => state.user)
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
      router.push('/login')
    }
  }
  if (!user)
    return (
      <Link href='/login'>
        <Button
          variant='link'
          className={cn('bg-white bg-opacity-15 rounded-xl text-white', className)}
        >
          <FaUser size={24} className='size-5 sm:size-6' />
        </Button>
      </Link>
    )
  return (
    <>
      <Dialog>
        <DialogContent className='w-[420px] rounded-3xl left-0 sm:left-auto sm:right-3 top-16 translate-x-0 translate-y-0 bg-gray-300 p-4 pb-0'>
          <DialogHeader>
            <DialogTitle className='text-center text-base'>{user.email}</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col items-center justify-center'>
            <AvatarUser className='size-20' user={user} />
            <p className='text-[22px] my-2'>{`Hi, ${user.name}`}</p>
            <div className='py-2'>
              {user.roleId !== 1 && (
                <Link
                  className='flex items-center gap-3 text-red-600 hover:text-red-500 font-semibold py-2 px-10 border border-red-600 rounded-xl bg-gray-50 hover:bg-gray-200'
                  href='/dashboard'
                >
                  <MdDashboardCustomize size={30} />
                  <span>Đi tới bảng điều khiển</span>
                </Link>
              )}
            </div>
            <div className='flex gap-1 w-full py-2 *:flex-1 *:w-full'>
              <Button
                asChild
                className='h-16 bg-gray-50 hover:bg-gray-300 text-back text-base rounded-s-3xl gap-3'
              >
                <Link href='/smember'>
                  <FaShopify className='text-red-600' size={30} />
                  <span>Smember</span>
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                className='h-16 bg-gray-50 hover:bg-gray-300 text-back text-base rounded-e-3xl gap-3'
              >
                <MdLogout size={30} />
                <span>Đăng suất</span>
              </Button>
            </div>
            <p className='h-[60px] text-center text-xs flex items-center'>
              Privacy Policy - Terms of Service
            </p>
          </div>
        </DialogContent>
        <HoverCard>
          <HoverCardTrigger>
            <DialogTrigger>
              <Avatar className={className}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='bg-purple-600 font-bold'>
                  {getFirstLetterUppercase(user.name)}
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
          </HoverCardTrigger>
          <HoverCardContent className='w-min py-2 px-3 text-xs bg-[#3C4043E6] border-[#3C4043E6] bg-opacity-90 text-[#bdc1c6]'>
            <p className='text-white'>Smember account</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </HoverCardContent>
        </HoverCard>
      </Dialog>
    </>
  )
}
