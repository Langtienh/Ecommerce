import { SearchInput } from '@/components/search'
import { FieldFilter, TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import {
  HTTP_METHOD_VALUES,
  PERMISSION_GROUP_VALUES,
  PermissionDetail
} from '@/services/permission'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import {
  HTTP_METHOD_OPTIONS,
  PERMISSION_GROUP_OPTIONS,
  PERMISSION_STATUS_OPTIONS,
  PERMISSION_STATUS_VALUE
} from './permission.data'
import DeleteManyButton from './permission.delete-many'

interface TableControlProps {
  table: Table<PermissionDetail>
  ids: number[]
  handleMutateSelected: () => void
}
export default function TableToolbar({ table, handleMutateSelected, ids }: TableControlProps) {
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchInput placeholder='Tìm kiếm một vài Permission' className='max-w-xs' />
      <FieldFilter
        defaultSelected={HTTP_METHOD_VALUES}
        fieldName='method'
        title='Method'
        options={HTTP_METHOD_OPTIONS}
      />
      <FieldFilter
        defaultSelected={PERMISSION_GROUP_VALUES}
        fieldName='group'
        title='Group'
        options={PERMISSION_GROUP_OPTIONS}
      />
      <FieldFilter
        defaultSelected={PERMISSION_STATUS_VALUE.map((item) => item.toString())}
        fieldName='isActive'
        title='Status'
        options={PERMISSION_STATUS_OPTIONS.map((item) => ({
          ...item,
          value: item.value.toString()
        }))}
      />
      <TableViewOptions table={table} />
      <Button asChild>
        <Link href='/dashboard/permissions/create'>Thêm mới</Link>
      </Button>
      <DeleteManyButton ids={ids} handleMutateSelected={handleMutateSelected} />
    </div>
  )
}
