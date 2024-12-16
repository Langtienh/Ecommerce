'use client'

import { imageSrc } from '@/lib/utils'
import Image from 'next/image'
import { FaCartPlus } from 'react-icons/fa'

export default function CartIcon() {
  return (
    <>
      <Image
        width={24}
        height={24}
        alt='cart'
        src={imageSrc('/header/cart')}
        className='hidden sm:block size-6 shrink-0 object-cover'
      />
      <FaCartPlus size={20} className='sm:hidden' />
    </>
  )
}
