'use client'

import useAccount from '@/hooks/use-account'
import { isLogin } from '@/services/cookies/auth-cookie'
import meRequestApi from '@/services/me/me-request'
import { useEffect } from 'react'

export default function AuthTrigger() {
  const setUser = useAccount((state) => state.setUser)
  useEffect(() => {
    const trigger = async () => {
      const isAuth = await isLogin()
      if (isAuth) {
        const res = await meRequestApi.getMe()
        setUser(res.data)
      }
    }
    trigger()
  }, [])
  return null
}
