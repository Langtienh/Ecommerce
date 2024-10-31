import { ColumnDef } from '@tanstack/react-table'

import ColumnHeaderServerSort from '@/components/table-helpper/header-server-sort'
import { Checkbox } from '@/components/ui/checkbox'
import { formatTimestamp } from '@/lib/format'
import { Role } from '@/services/role-request-api'
import Actions from './actions'

export const roleColumns: ColumnDef<Role>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='RoleId' />,
    cell: ({ row }) => <div>{`ROL00${row.getValue('id')}`}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Name' />,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Desciption' />,
    cell: ({ row }) => <div>{row.getValue('description')}</div>
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='CreateAt' />,
    cell: ({ row }) => <div>{formatTimestamp(row.getValue('createdAt'))}</div>
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='UpdatedAt' />,
    cell: ({ row }) => <div>{formatTimestamp(row.getValue('updatedAt'))}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original
      return <Actions role={role} />
    }
  }
]
