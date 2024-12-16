import { Separator } from '@/components/ui/separator'
import { cn, imageSrc } from '@/lib/utils'
import Image from 'next/image'
import LoginProvider from './login-privider'

interface AuthLabelProps {
  className?: string
  label: string
}
export default function AuthLabel({ className, label }: AuthLabelProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center pb-5', className)}>
      <div className='flex flex-col items-center justify-center gap-2 py-5'>
        <Image
          width={100}
          height={100}
          alt='shipper'
          src={imageSrc('/shipper')}
          className='size-[100px] shrink-0'
        />
        <h3>{`${label} với`}</h3>
      </div>
      <LoginProvider />
      <div className='flex items-center justify-center gap-5 py-5'>
        <Separator className='w-[170px]' />
        <span>Hoặc</span>
        <Separator className='w-[170px]' />
      </div>
    </div>
  )
}
