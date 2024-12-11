'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  className?: string
  title: string
  description?: string
}
export function Modal({ children, title, className, description }: ModalProps) {
  const router = useRouter()
  return (
    <Dialog defaultOpen={true} onOpenChange={() => router.back()}>
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
