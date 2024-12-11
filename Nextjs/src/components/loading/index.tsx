'use client'

import useLoading from '@/hooks/use-loading'
import { imageSrc } from '@/lib/utils'
import Image from 'next/image'
import { ThreeDots } from 'react-loader-spinner'
import { Dialog, DialogOverlay } from '../ui/dialog'
import './style.css'

export function OverlayLoading() {
  const isLoading = useLoading((state) => state.isLoading)
  if (isLoading)
    return (
      <Dialog defaultOpen>
        <DialogOverlay>
          <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <Image
              width={200}
              height={200}
              alt='shipper'
              src={imageSrc('/shipper2')}
              className='image-animation'
            />
            <h4 className='text-white flex items-start gap-2'>
              <span>Đang tải</span>
              <ThreeDots
                visible={true}
                height='40'
                width='40'
                color='#fff'
                radius='12.5'
                wrapperClass='grid-wrapper'
              />
            </h4>
            <h4 className='text-white'>Vui lòng chờ trong giây lát</h4>
          </div>
        </DialogOverlay>
      </Dialog>
    )
}
