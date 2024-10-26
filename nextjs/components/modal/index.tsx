'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
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
