'use client'

import { Dialog, DialogOverlay } from '@/components/ui/dialog'
import { handleErrorApi } from '@/lib/handle-request'
import authenRequestApi from '@/services/authen/authen-request'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function Page() {
  return (
    <Suspense fallback={<UI />}>
      <Wrapper />
    </Suspense>
  )
}

const Wrapper = () => {
  const searchParam = useSearchParams()
  const redirectUrl = searchParam.get('redirectUrl') || 'home'
  const router = useRouter()
  useEffect(() => {
    const refreshTokenHandle = async () => {
      try {
        await authenRequestApi.getOptionWithAccessToken()
        router.push(redirectUrl)
      } catch (error) {
        handleErrorApi({ error })
        router.push('/home')
      }
    }
    refreshTokenHandle()
  }, [])
  return <UI />
}
const UI = () => {
  return (
    <Dialog defaultOpen>
      <DialogOverlay>
        <div className='w-screen flex flex-col justify-center items-center p-20'>
          <Image width={200} height={200} alt='shipper' src='/images/shipper.png' />
          <h4 className='mt-3 text-white flex gap-2'>
            <span>Refreshing</span>
            <ThreeDots visible={true} height='30' width='30' color='#fff' radius='12.5' wrapperClass='grid-wrapper' />
          </h4>
          <h4 className='text-white'>Xin vui lòng đợi một chút</h4>
        </div>
      </DialogOverlay>
    </Dialog>
  )
}
