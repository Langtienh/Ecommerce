'use client'

import { refreshTokenTrigger } from '@/services/cookies/authen'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')
  useEffect(() => {
    console.log(accessToken, refreshToken)
    const setToken = async () => {
      if (accessToken && refreshToken) await refreshTokenTrigger({ accessToken, refreshToken })
    }
    setToken()
  }, [accessToken, refreshToken])
  return <></>
}
