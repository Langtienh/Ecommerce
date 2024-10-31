'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import * as React from 'react'

import { SearchInput } from '@/components/search'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { getIndexSelectedRow, getSelectedRow } from '@/lib/tanstack-table-helpper'
import { requestApi } from '@/services'
import { Resource } from '@/services/resource-request-api'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { resourceColumns } from './resource-data'

export default function ResourceTable({ data }: { data: Paginate<Resource> }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { replace, refresh } = useRouter()
  const patchName = usePathname()
  const searchParams = useSearchParams()

  const { finallyLoading, startLoading } = useLoading()
  // xóa nhiều
  const handleDeleteMany = async () => {
    startLoading()
    try {
      const dataSelected = getSelectedRow(rowSelection, data.result)
      const res = await requestApi.resource.deleteMany(dataSelected.map((item) => item.id))
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setRowSelection({})
      refresh()
      finallyLoading()
    }
  }

  // chuyển trang
  const onChangeNavagite = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    replace(`${patchName}?${params}`, { scroll: false })
  }

  const handleNextPage = () => onChangeNavagite(data.meta.page + 1)
  const handlePrevPage = () => onChangeNavagite(data.meta.page - 1)

  const table = useReactTable({
    data: data.result,
    columns: resourceColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className='w-full'>
      <div className='flex items-center gap-x-5 py-4'>
        <SearchInput placeholder='Tìm kiếm một vài resource' className='max-w-sm' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button asChild>
          <Link href='/dashboard/resources/create'>Thêm mới</Link>
        </Button>
        <Button
          onClick={handleDeleteMany}
          variant='destructive'
          disabled={getIndexSelectedRow(rowSelection).length === 0}
        >
          Xóa
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={resourceColumns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className='space-x-2'>
          <Button variant='outline' size='sm' onClick={handlePrevPage} disabled={data.meta.page === 1}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={handleNextPage}
            disabled={data.meta.page === data.meta.totalPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
