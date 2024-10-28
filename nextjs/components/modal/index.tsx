'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface ModalProps {
  children: ReactNode
  className?: string
  title: string
  description?: string
}
export default function Modal({ children, title, className, description }: ModalProps) {
  const router = useRouter()
  const [initialLoad, setInitialLoad] = useState(true)
  const path = usePathname()
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false)
    } else {
      router.back()
    }
  }, [path])
  return (
    <Dialog defaultOpen={true} onOpenChange={() => router.back()}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
