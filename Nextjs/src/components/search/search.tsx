'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '../ui/input'

interface SearchInputProps {
  className?: string
  placeholder?: string
}
function Search({ className, placeholder }: SearchInputProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)
  return (
    <Input
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search')?.toString()}
      placeholder={placeholder}
      className={cn('', className)}
    />
  )
}

export function SearchInput(props: SearchInputProps) {
  return (
    <Suspense
      fallback={<Input placeholder={props.placeholder} className={cn('', props.className)} />}
    >
      <Search {...props} />
    </Suspense>
  )
}
