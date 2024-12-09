'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import useRequestLogin from '@/hooks/use-request-login'
import { imageSrc } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export function RedirectLoginModal() {
  const { close, callBackUrl, isOpen, openHandle } = useRequestLogin()
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close()
        else openHandle(callBackUrl)
      }}
    >
      <DialogContent className='p-4 w-[350px] rounded-xl flex flex-col gap-4 items-center justify-center'>
        <h3 className='text-red-600 text-center text-[25px]'>Smember</h3>
        <Image width={80} height={80} alt='shipper' src={imageSrc('/shipper')} />
        <p className='text-center text-[15px] font-semibold'>
          Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ dàng hơn.
        </p>
        <div className='w-full flex justify-between gap-5'>
          <Link
            className='flex-1'
            href={callBackUrl ? `/register?callbackUrl=${callBackUrl}` : '/register'}
          >
            <Button
              variant='outline'
              size='lg'
              className='w-full border-red-600 border-2 text-red-600 hover:text-red-500 font-bold shadow-red-500/50 hover:scale-105'
            >
              Đăng ký
            </Button>
          </Link>
          <Link
            className='flex-1'
            href={callBackUrl ? `/login?callbackUrl=${callBackUrl}` : '/login'}
          >
            <Button
              size='lg'
              className='w-full font-bold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 hover:scale-105'
            >
              Đăng nhập
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
