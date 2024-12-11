import { SearchInput } from '@/components/search'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useLoading from '@/hooks/use-loading'
import { serverRevalidatePathAndRedirect } from '@/lib/action'
import { handleErrorApi } from '@/lib/handle-request'
import { ResourceDetail, resourceRequest } from '@/services/resource'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import { toast } from 'sonner'

interface TableControlProps {
  table: Table<ResourceDetail>
  ids: number[]
  handleMutateSelected: () => void
}

export const ResourceToolbar = ({ handleMutateSelected, ids, table }: TableControlProps) => {
  const { finallyLoading, startLoading } = useLoading()
  // xóa nhiều
  const handleDeleteMany = async () => {
    startLoading()
    try {
      const res = await resourceRequest.deleteMany(ids)
      toast.success(res.message)
      await serverRevalidatePathAndRedirect('/dashboard/resources', 'sort=-updatedAt')
      handleMutateSelected()
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      finallyLoading()
    }
  }
  return (
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
      <Button onClick={handleDeleteMany} variant='destructive' disabled={ids.length === 0}>
        Xóa
      </Button>
    </div>
  )
}
