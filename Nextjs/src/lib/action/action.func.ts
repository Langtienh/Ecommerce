'use server'

import envConfig from '@/config/envConfig'
import { delay } from '@/lib/utils'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const serverRevalidateTag = async (tag: string | string[]) => {
  if (Array.isArray(tag)) for (const t of tag) revalidatePath(t)
  else revalidateTag(tag)
}

export const serverRevalidatePath = async (path: string | string[]) => {
  if (Array.isArray(path)) for (const p of path) revalidatePath(p)
  else revalidatePath(path)
}

export const SeverRedirect = async (path: string) => {
  redirect(path)
}

// phục vụ sử dụng gọi cookies bằng server action
// set delay để đảm bảo cookie được set hoặc delete trước khi trả về response
const DELAY_COOKIE = envConfig.DELAY_COOKIE
export const ServerGetCookie = async (key: string) => {
  return cookies().get(key)?.value
}
export const ServerSetCookie = async (option: ISetCookieOption) => {
  cookies().set({ httpOnly: true, secure: true, ...option })
  await delay(DELAY_COOKIE)
}
export const ServerSetCookie2 = async (key: string, value: string) => {
  cookies().set(key, value)
  await delay(DELAY_COOKIE)
}
export const ServerDeleteCookie = async (key: string) => {
  cookies().delete(key)
  await delay(DELAY_COOKIE)
}
export const ServerHasCookie = async (key: string) => {
  return cookies().has(key)
}
