'use client'

import { refreshTokenTrigger } from '@/services/cookies/auth-cookie'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function Client() {
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')
  useEffect(() => {
    const setToken = async () => {
      if (accessToken && refreshToken) await refreshTokenTrigger({ accessToken, refreshToken })
    }
    setToken()
  }, [accessToken, refreshToken])
  return <></>
}

export default function Page() {
  return (
    <Suspense fallback={<></>}>
      <Client />
    </Suspense>
  )
}
