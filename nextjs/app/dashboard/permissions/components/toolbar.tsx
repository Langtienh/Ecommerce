import { SearchInput } from '@/components/search'
import { FieldFilter } from '@/components/table-helpper/field-filter'
import TableViewOptions from '@/components/table-helpper/view-option'
import { Button } from '@/components/ui/button'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import { HTTP_METHOD_OPTIONS, HTTP_METHOD_VALUE, PERMISSION_STATUS_OPTIONS, PERMISSION_STATUS_VALUE } from './data'
import DeleteManyButton from './delete-many'

interface TableControlProps {
  methods?: HTTP_METHOD[]
  status?: string[]
  table: Table<Permission>
  ids: number[]
  handleMutateSelected: () => void
}
export default function TableToolbar({ methods, status, table, handleMutateSelected, ids }: TableControlProps) {
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchInput placeholder='Tìm kiếm một vài Permission' className='max-w-xs' />
      <FieldFilter
        selectedValues={methods}
        defaultSelected={HTTP_METHOD_VALUE}
        fieldName='method'
        title='Method'
        options={HTTP_METHOD_OPTIONS}
      />
      <FieldFilter
        selectedValues={status}
        defaultSelected={PERMISSION_STATUS_VALUE}
        fieldName='status'
        title='Status'
        options={PERMISSION_STATUS_OPTIONS}
      />
      <TableViewOptions table={table} />
      <Button asChild>
        <Link href='/dashboard/permissions/create'>Thêm mới</Link>
      </Button>
      <DeleteManyButton ids={ids} handleMutateSelected={handleMutateSelected} />
    </div>
  )
}
