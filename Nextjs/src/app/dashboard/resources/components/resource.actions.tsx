import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useLoading from '@/hooks/use-loading'
import { serverRevalidatePathAndRedirect } from '@/lib/action'
import { handleErrorApi } from '@/lib/handle-request'
import { ResourceDetail, resourceRequest } from '@/services/resource'
import Link from 'next/link'
import { toast } from 'sonner'

export default function Actions({ resource }: { resource: ResourceDetail }) {
  const { startLoading, finallyLoading } = useLoading()
  const handleDelete = async (id: number) => {
    startLoading()
    try {
      const res = await resourceRequest.delete(id)
      toast.success(res.message)
      await serverRevalidatePathAndRedirect('/dashboard/resources', 'sort=-updatedAt')
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      finallyLoading()
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <DotsHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(resource.id.toString())}>
          Copy resource ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/resources/${resource.id}/edit`}>Edit resource</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(resource.id)}>
          Delete resource
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
