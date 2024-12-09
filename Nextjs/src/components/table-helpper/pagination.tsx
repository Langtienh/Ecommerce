import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface TablePaginationProps<TData> {
  table: Table<TData>
  meta: PaginateMeta
  pageSizeOptions?: number[]
}

const PAGE_SIZE_OPTION_DEFAULT = [5, 8, 10, 15, 20, 25]

export function TablePagination<TData>({
  table,
  meta,
  pageSizeOptions
}: TablePaginationProps<TData>) {
  const _pageSizeOptions = pageSizeOptions || PAGE_SIZE_OPTION_DEFAULT
  const { replace } = useRouter()
  const patchName = usePathname()
  const searchParams = useSearchParams()

  // change limit to url and reset page to 1
  const handlePageSizeChange = (pageSize: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', pageSize.toString())
    params.set('page', '1')
    replace(`${patchName}?${params}`)
  }
  // change page to url
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    replace(`${patchName}?${params}`, { scroll: false })
  }

  return (
    <div className='flex items-center justify-between px-2 py-4'>
      <div className='flex-1 text-sm text-muted-foreground'>
        {table.getFilteredSelectedRowModel().rows.length} of {meta.totalItem} row(s) selected.
      </div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select value={meta.limit.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {_pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(1)}
            disabled={meta.page === 1}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(meta.page - 1)}
            disabled={meta.page === 1}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(meta.page + 1)}
            disabled={meta.page === meta.totalPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(meta.totalPage)}
            disabled={meta.page === meta.totalPage}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
