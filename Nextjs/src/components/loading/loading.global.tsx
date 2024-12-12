'use client'

import useLoading from '@/hooks/use-loading'
import { LoadingDialog } from './loading.dialog'
import './style.css'

export function OverlayLoading() {
  const isLoading = useLoading((state) => state.isLoading)
  if (isLoading) return <LoadingDialog />
}
