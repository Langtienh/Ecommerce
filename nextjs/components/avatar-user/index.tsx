import { getFirstLetterUppercase } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface AvatarUserProps {
  className?: string
  user: {
    avatar?: string
    name: string
  }
}
export default function AvatarUser({ className, user: { avatar, name } }: AvatarUserProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className='bg-purple-600 font-bold text-2xl text-white'>
        {getFirstLetterUppercase(name)}
      </AvatarFallback>
    </Avatar>
  )
}
