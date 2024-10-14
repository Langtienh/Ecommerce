'use client'

import Image from 'next/image'
import { ThreeDots } from 'react-loader-spinner'
import { useLoading } from './context'
import './style.css'

export default function OverlayLoading() {
  const { isLoading } = useLoading()
  if (isLoading)
    return (
      <div className='fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black bg-opacity-20'>
        <Image width={200} height={200} alt='shipper' src='/images/shipper2.png' className='absolute image-animation' />
        <div className='absolute translate-y-1/2'>
          <ThreeDots
            visible={true}
            height='200'
            width='200'
            color='#d70018'
            radius='12.5'
            wrapperClass='grid-wrapper'
          />
        </div>
      </div>
    )
}
