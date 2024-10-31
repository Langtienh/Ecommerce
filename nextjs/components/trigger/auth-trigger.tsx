'use client'

import useAccount from '@/hooks/use-account'
import { requestApi } from '@/services'
import { isLogin } from '@/services/cookies/auth-cookie'
import { useEffect } from 'react'

export default function AuthTrigger() {
  const setUser = useAccount((state) => state.setUser)
  const user = useAccount((state) => state.user)
  useEffect(() => {
    const trigger = async () => {
      if (user) return
      const isAuth = await isLogin()
      if (isAuth) {
        const res = await requestApi.me.getMe()
        setUser(res.data)
      }
    }
    trigger()
  }, [user])
  return null
}
