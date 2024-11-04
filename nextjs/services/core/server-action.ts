'use server'

import { SET_COOKIES_OPTIONS_TYPE } from '@/constants'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export const serverRevalidateTag = async (tag: string | string[]) => {
  if (Array.isArray(tag)) for (const t of tag) revalidatePath(t)
  else revalidateTag(tag)
}

export const serverRevalidatePath = async (path: string | string[]) => {
  if (Array.isArray(path)) for (const p of path) revalidatePath(p)
  else revalidatePath(path)
}

// phục vụ sử dụng gọi cookies bằng server action
export const SGetCookie = async (key: string) => {
  return cookies().get(key)?.value
}
export const SSetCookie = async (option: SET_COOKIES_OPTIONS_TYPE) => {
  cookies().set({ httpOnly: true, secure: true, ...option })
}
export const SSetCookie2 = async (key: string, value: string) => {
  cookies().set(key, value)
}
export const SDeleteCookie = async (key: string) => {
  cookies().delete(key)
}

export const SHasCookie = async (key: string) => {
  return cookies().has(key)
}
