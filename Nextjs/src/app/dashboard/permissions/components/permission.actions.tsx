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
import { PermissionDetail, permissionRequest } from '@/services/permission'
import Link from 'next/link'
import { toast } from 'sonner'

export default function Actions({ permission }: { permission: PermissionDetail }) {
  const { startLoading, finallyLoading } = useLoading()
  const handleDelete = async (id: number) => {
    startLoading()
    try {
      const res = await permissionRequest.delete(id)
      await serverRevalidatePathAndRedirect('/dashboard/permisions', 'sort=-updatedAt')
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      finallyLoading()
    }
  }
  const handleChangeStatus = async (permission: PermissionDetail) => {
    startLoading()
    try {
      const res = await permissionRequest.update(permission.id, {
        isActive: !permission.isActive
      })
      await serverRevalidatePathAndRedirect('/dashboard/permisions', 'sort=-updatedAt')
      toast.success(res.message)
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(permission.id.toString())}>
          Copy permission ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/permissions/${permission.id}/edit`}>Edit permission</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(permission.id)}>
          Delete permission
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeStatus(permission)}>
          {permission.isActive ? 'Disable permission' : 'Enable'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
