import envConfig from '@/config/envConfig'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function delayForm() {
  return delay(envConfig.DELAY_FORM)
}

export function delayFetch() {
  return delay(envConfig.DELAY_FETCH)
}

export function getFirstLetterUppercase(name: string): string {
  if (!name) return ''
  const strs = name.split(' ')
  return strs.map((str) => str.trim().charAt(0).toUpperCase()).join('')
}

export const imageSrc = (url: string) => {
  if (url.startsWith('/')) return `${envConfig.IMAGE_PREFIX_URL}${url}`
  return `${envConfig.IMAGE_PREFIX_URL}/${url}`
}

// xóa dấu '/' ở đầu  nếu có
export const formatUrl = (url: string) => {
  if (url.startsWith('/')) return url.slice(1)
  return url
}
