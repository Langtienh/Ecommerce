import { SearchInput } from '@/components/search'
import { FieldFilter } from '@/components/table-helpper/field-filter'
import TableViewOptions from '@/components/table-helpper/view-option'
import { Button } from '@/components/ui/button'
import { PermissionWittGroup } from '@/services/permission-request-api'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import { HTTP_METHOD_OPTIONS, HTTP_METHOD_VALUE, PERMISSION_STATUS_OPTIONS, PERMISSION_STATUS_VALUE } from './data'
import DeleteManyButton from './delete-many'

interface TableControlProps {
  table: Table<PermissionWittGroup>
  ids: number[]
  handleMutateSelected: () => void
}
export default function TableToolbar({ table, handleMutateSelected, ids }: TableControlProps) {
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchInput placeholder='Tìm kiếm một vài Permission' className='max-w-xs' />
      <FieldFilter
        defaultSelected={HTTP_METHOD_VALUE}
        fieldName='method'
        title='Method'
        options={HTTP_METHOD_OPTIONS}
      />
      <FieldFilter
        defaultSelected={PERMISSION_STATUS_VALUE.map((item) => item.toString())}
        fieldName='status'
        title='Status'
        options={PERMISSION_STATUS_OPTIONS.map((item) => ({ ...item, value: item.value.toString() }))}
      />
      <TableViewOptions table={table} />
      <Button asChild>
        <Link href='/dashboard/permissions/create'>Thêm mới</Link>
      </Button>
      <DeleteManyButton ids={ids} handleMutateSelected={handleMutateSelected} />
    </div>
  )
}
