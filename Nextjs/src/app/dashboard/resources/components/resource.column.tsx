import { ColumnDef } from '@tanstack/react-table'

import { ColumnHeaderServerSort } from '@/components/table-helpper'
import { Checkbox } from '@/components/ui/checkbox'
import { formatTimestamp } from '@/lib/format'
import { ResourceDetail } from '@/services/resource'
import Actions from './resource.actions'

export const resourceColumns: ColumnDef<ResourceDetail>[] = [
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
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='ResourceId' />,
    cell: ({ row }) => <div>{`SRC00${row.getValue('id')}`}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Name' />
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <ColumnHeaderServerSort column={column} title='Description' />
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
      const resource = row.original

      return <Actions resource={resource} />
    }
  }
]
