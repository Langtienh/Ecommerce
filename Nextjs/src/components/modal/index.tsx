'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface ModalProps {
  children: ReactNode
  className?: string
  title: string
  description?: string
  parentPath: string
}
export function Modal({ children, title, className, description, parentPath }: ModalProps) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(true)
  const pathName = usePathname()
  useEffect(() => {
    if (pathName === parentPath) setOpen(false)
    else setOpen(true)
  }, [pathName, parentPath])
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) router.back()
        setOpen(open)
      }}
    >
      <DialogContent className={cn('max-h-[600px] overflow-auto', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description || ''}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
