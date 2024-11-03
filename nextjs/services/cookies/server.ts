'use server'

import { SET_COOKIES_OPTIONS_TYPE } from '@/constants'
import { cookies } from 'next/headers'

// phục vụ sử dụng gọi cookies bằng server action
export const SGetCookie = async (key: string) => {
  return cookies().get(key)?.value
}
export const SSetCookie = async (option: SET_COOKIES_OPTIONS_TYPE) => {
  cookies().set({ httpOnly: true, secure: true, ...option })
}
export const SDeleteCookie = async (key: string) => {
  cookies().delete(key)
}
