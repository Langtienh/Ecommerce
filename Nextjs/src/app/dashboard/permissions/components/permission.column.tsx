import { ColumnDef } from '@tanstack/react-table'

import { ColumnHeaderServerSort } from '@/components/table-helpper'
import { Checkbox } from '@/components/ui/checkbox'
import { formatTimestamp } from '@/lib/format'
import { PermissionDetail } from '@/services/permission'
import Actions from './permission.actions'
import { PermissionMethod, PermissionStatus } from './permission.data'

export const PermissionColumns: ColumnDef<PermissionDetail>[] = [
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
    cell: ({ row }) => <PermissionStatus isActive={!!row.getValue('isActive')} />
  },
  {
    accessorKey: 'group',
    id: 'group',
    header: 'Group'
  },
  {
    accessorKey: 'resource.name',
    id: 'resource',
    header: 'Resource'
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='CreatedAt' />,
    cell: ({ row }) => {
      return (
        <div className='font-medium text-center max-w-[120px]'>
          <p>{formatTimestamp(row.getValue('createdAt'))}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'creator',
    id: 'creator',
    header: 'Creator',
    cell: ({ row }) => {
      const creator = row.original.creator
      if (!creator) return 'null'
      return (
        <div>
          <div>{creator.name}</div>
          <div>{creator.email}</div>
        </div>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='UpdatedAt' />,
    cell: ({ row }) => {
      return (
        <div className='font-medium text-center max-w-[120px]'>
          <p>{formatTimestamp(row.getValue('updatedAt'))}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'updater',
    id: 'updater',
    header: 'Updater',
    cell: ({ row }) => {
      const updater = row.original.updater
      if (!updater) return 'null'
      return (
        <div>
          <div>{updater.name}</div>
          <div>{updater.email}</div>
        </div>
      )
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
