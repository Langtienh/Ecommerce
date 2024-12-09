'use client'

import useAccount from '@/hooks/use-account'

export default function UserName() {
  const user = useAccount((state) => state.user)
  return <p className='capitalize hidden sm:block'>{`Hi ${user?.name || 'loading...'}`}</p>
}
