'use client'

import useAccount from '@/hooks/use-account'
import { requestApi } from '@/services'
import { cookiesService } from '@/services/core/cookie-services'
import { useEffect } from 'react'

export default function AuthTrigger() {
  const setUser = useAccount((state) => state.setUser)
  const user = useAccount((state) => state.user)
  useEffect(() => {
    const trigger = async () => {
      if (user) return
      const isAuth = await cookiesService.SHasCookie('refreshToken')
      if (isAuth) {
        const res = await requestApi.me.getMe()
        setUser(res.data)
      }
    }
    trigger()
  }, [user])
  return null
}
