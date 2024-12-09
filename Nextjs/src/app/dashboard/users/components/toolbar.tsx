import { SearchInput } from '@/components/search'
import { FieldFilter, TableViewOptions } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { Role } from '@/services/role'
import { USER_STATUS_VALUES, UserDetail } from '@/services/user'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import DeleteManyButton from './delete-many'

interface TableControlProps {
  table: Table<UserDetail>
  ids: number[]
  handleMutateSelected: () => void
  roles: Role[]
}
export default function TableToolbar({
  table,
  handleMutateSelected,
  ids,
  roles
}: TableControlProps) {
  return (
    <div className='flex items-center gap-x-3 py-4'>
      <SearchInput placeholder='Nhập tên, email hoặc số điện thoại' className='max-w-xs' />
      <FieldFilter
        defaultSelected={USER_STATUS_VALUES}
        fieldName='status'
        title='Status'
        options={USER_STATUS_VALUES.map((value) => ({
          value,
          item: <p className='uppercase'>{value}</p>
        }))}
      />
      <FieldFilter
        defaultSelected={roles.map((role) => role.id.toString())}
        fieldName='roleId'
        title='Role'
        options={roles.map((value) => ({
          value: value.id.toString(),
          item: <p className='capitalize'>{value.name}</p>
        }))}
      />
      <TableViewOptions table={table} />
      <Button asChild>
        <Link href='/dashboard/users/create'>Thêm mới</Link>
      </Button>
      <DeleteManyButton ids={ids} handleMutateSelected={handleMutateSelected} />
    </div>
  )
}
