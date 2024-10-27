import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ColumnHeaderServerSortProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
  columnName?: string
}

export default function ColumnHeaderServerSort<TData, TValue>({
  column,
  title,
  className,
  columnName
}: ColumnHeaderServerSortProps<TData, TValue>) {
  const sortName = columnName || column.id
  const { replace } = useRouter()
  const patchName = usePathname()
  const searchParams = useSearchParams()
  const prevSort = searchParams.get('sort')
  const sort = prevSort?.split(',') || []
  const isColumnSortedASC = sort.includes(sortName)
  const isColumnSortedDESC = sort.includes(`-${sortName}`)
  const handleSort = (isDesc: boolean) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (isDesc) {
      if (isColumnSortedDESC) {
        sort.splice(sort.indexOf(`-${sortName}`), 1)
      } else {
        if (isColumnSortedASC) {
          sort.splice(sort.indexOf(sortName), 1)
        }
        sort.push(`-${sortName}`)
      }
    } else {
      if (isColumnSortedASC) {
        sort.splice(sort.indexOf(sortName), 1)
      } else {
        if (isColumnSortedDESC) {
          sort.splice(sort.indexOf(`-${sortName}`), 1)
        }
        sort.push(sortName)
      }
    }
    params.set('sort', sort.join(','))
    if (sort.length === 0) {
      params.delete('sort')
    }
    replace(`${patchName}?${params.toString()}`, { scroll: false })
  }
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='-ml-3 h-8 data-[state=open]:bg-accent'>
            <span>{title}</span>
            {isColumnSortedDESC ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : isColumnSortedASC ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <CaretSortIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => handleSort(false)}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort(true)}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
