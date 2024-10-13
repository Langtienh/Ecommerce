import { cn } from '@/lib/utils'
import { SearchInput } from '../search'

interface SearchProps {
  className?: string
}
export default function Search({ className }: SearchProps) {
  return (
    <div className={cn(className)}>
      <SearchInput className='bg-white text-black text-base' placeholder='Bạn cần tìm gì?' />
    </div>
  )
}
