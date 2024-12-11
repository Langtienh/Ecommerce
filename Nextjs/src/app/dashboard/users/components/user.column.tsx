import { ColumnDef } from '@tanstack/react-table'

import { ColumnHeaderServerSort } from '@/components/table-helpper'
import { Checkbox } from '@/components/ui/checkbox'
import { formatTimestamp } from '@/lib/format'
import { UserDetail } from '@/services/user'
import Actions from './user.actions'

export const columns: ColumnDef<UserDetail>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='UserId' />,
    cell: ({ row }) => <div>{`USR00${row.getValue('id')}`}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Name' />,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Email' />,
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Phone' />,
    cell: ({ row }) => <div>{row.getValue('phone')}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div>{row.getValue('status')}</div>
  },
  {
    accessorKey: 'role.name',
    id: 'role',
    header: 'Role',
    cell: ({ row }) => <div>{row.getValue('role')}</div>
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='CreatedAt' />,
    cell: ({ row }) => <div>{formatTimestamp(row.getValue('createdAt'))}</div>
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Latest update' />,
    cell: ({ row }) => <div>{formatTimestamp(row.getValue('updatedAt'))}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return <Actions user={user} />
    }
  }
]
