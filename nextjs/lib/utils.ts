import envConfig from '@/config'
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
