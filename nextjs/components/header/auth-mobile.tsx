'use client'

import useAccount from '@/hooks/use-account'
import { getFirstLetterUppercase } from '@/lib/utils'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function AuthMobile() {
  const user = useAccount((state) => state.user)
  if (!user)
    return (
      <Link href='/login'>
        <FaUser size={20} className='size-5' />
        <span className='text-xs'>Đăng nhập</span>
      </Link>
    )
  const sortName = user.name.split(' ')[0].trim()
  return (
    <Link href='/smember'>
      <Avatar className='size-5' asChild>
        <Link href='/smember'>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className='bg-purple-600 font-bold text-xs text-white'>
            {getFirstLetterUppercase(user.name)}
          </AvatarFallback>
        </Link>
      </Avatar>
      <span className='text-xs'>{sortName}</span>
    </Link>
  )
}
