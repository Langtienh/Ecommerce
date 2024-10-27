'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const path = usePathname()
  useEffect(() => {
    setIsOpen((pre) => !pre)
  }, [path])
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        router.back()
        setIsOpen(!open)
      }}
    >
      <DialogContent className='p-0'>{children}</DialogContent>
    </Dialog>
  )
}
