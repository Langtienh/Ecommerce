import { SearchInput } from '@/components/search'
import { TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { RoleDetail } from '@/services/role'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import DeleteManyButton from './role.delete-many'

interface TableControlProps {
  table: Table<RoleDetail>
  ids: number[]
  handleMutateSelected: () => void
}
export default function TableToolbar({ table, handleMutateSelected, ids }: TableControlProps) {
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchInput placeholder='Tìm kiếm một vài role' className='max-w-xs' />
      <TableViewOptions table={table} />
      <Button asChild>
        <Link href='/dashboard/roles/create'>Thêm mới</Link>
      </Button>
      <DeleteManyButton ids={ids} handleMutateSelected={handleMutateSelected} />
    </div>
  )
}
