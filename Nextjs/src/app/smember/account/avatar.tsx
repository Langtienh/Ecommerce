'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getFirstLetterUppercase } from '@/lib/utils'
import { User } from '@/services/user'
import { FaCamera } from 'react-icons/fa'

export default function UploadAvatar({ user }: { user: User }) {
  return (
    <div className='flex flex-col items-center justify-center spay2'>
      <Avatar className='size-24 relative overflow-visible'>
        <AvatarImage src={user?.avatar} alt={user.name} />
        <AvatarFallback className='bg-purple-600 font-bold text-2xl text-white'>
          {getFirstLetterUppercase(user.name)}
        </AvatarFallback>
        <span className='cursor-pointer absolute bottom-0 right-0  bg-white border rounded-full hover:border-blue-600 hover:text-blue-600 flex items-center justify-center p-2'>
          <FaCamera />
        </span>
      </Avatar>
      <p className='text-center font-bold'>{user.name}</p>
    </div>
  )
}
