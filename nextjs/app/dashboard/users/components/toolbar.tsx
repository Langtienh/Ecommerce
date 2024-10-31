import { SearchInput } from '@/components/search'
import { FieldFilter } from '@/components/table-helpper/field-filter'
import TableViewOptions from '@/components/table-helpper/view-option'
import { Button } from '@/components/ui/button'
import { USER_STATUS_VALUES, UserDetail } from '@/services/user-request-api'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import DeleteManyButton from './delete-many'

interface TableControlProps {
  table: Table<UserDetail>
  ids: number[]
  handleMutateSelected: () => void
}
export default function TableToolbar({ table, handleMutateSelected, ids }: TableControlProps) {
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchInput placeholder='Nhập tên, email hoặc số điện thoại' className='max-w-xs' />
      <FieldFilter
        defaultSelected={USER_STATUS_VALUES}
        fieldName='status'
        title='Status'
        options={USER_STATUS_VALUES.map((value) => ({ value, item: <p className='uppercase'>{value}</p> }))}
      />
      <TableViewOptions table={table} />
      <Button asChild>
        <Link href='/dashboard/roles/create'>Thêm mới</Link>
      </Button>
      <DeleteManyButton ids={ids} handleMutateSelected={handleMutateSelected} />
    </div>
  )
}
