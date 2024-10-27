import { ColumnDef } from '@tanstack/react-table'

import ColumnHeaderServerSort from '@/components/table-helpper/header-server-sort'
import { Checkbox } from '@/components/ui/checkbox'
import Actions from './actions'
import { PermissionMethod, PermissionStatus } from './data'

export const permissionColumns: ColumnDef<Permission>[] = [
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
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='PermissionId' />,
    cell: ({ row }) => <div>{`PER00${row.getValue('id')}`}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Name' />,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'apiPath',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='ApiPath' />,
    cell: ({ row }) => <div>{row.getValue('apiPath')}</div>
  },
  {
    accessorKey: 'method',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Method' />,
    cell: ({ row }) => (
      <div>
        <PermissionMethod method={row.getValue('method')} />
      </div>
    )
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => <PermissionStatus isActive={!!row.getValue('isActive') ? 'true' : 'false'} />
  },
  {
    accessorKey: 'groupName',
    header: 'Group',
    cell: ({ row }) => {
      return <div>{row.getValue('groupName')}</div>
    }
  },
  {
    accessorKey: 'resourceId',
    header: 'ResourceId',
    cell: ({ row }) => {
      return <div className='font-medium text-center'>{row.getValue('resourceId')}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const permission = row.original
      return <Actions permission={permission} />
    }
  }
]
