'use client'

import Image from 'next/image'
import { FaCartPlus } from 'react-icons/fa'

export default function CartIcon() {
  return (
    <>
      <Image
        width={24}
        height={24}
        alt='cart'
        src='/images/header/cart.svg'
        className='hidden sm:block size-6 shrink-0 object-cover'
      />
      <FaCartPlus size={20} className='sm:hidden' />
    </>
  )
}
