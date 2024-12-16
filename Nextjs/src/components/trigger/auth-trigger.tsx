'use client'

import useAccount from '@/hooks/use-account'
import { ServerHasCookie } from '@/lib/action'
import { meRequest } from '@/services/me/me.request'
import { useCallback, useEffect } from 'react'

export function AuthTrigger() {
  const setUser = useAccount((state) => state.setUser)
  const user = useAccount((state) => state.user)
  const trigger = useCallback(async () => {
    if (user) return
    const isAuth = await ServerHasCookie('refreshToken')
    if (isAuth) {
      const res = await meRequest.get()
      setUser(res.data)
    }
  }, [user, setUser])
  useEffect(() => {
    trigger()
  }, [trigger])
  return null
}
