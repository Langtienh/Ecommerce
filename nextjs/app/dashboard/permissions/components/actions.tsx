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
import { handleErrorApi } from '@/lib/handle-request'
import { requestApi } from '@/services'
import { PermissionWittGroup } from '@/services/permission-request-api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Actions({ permission }: { permission: PermissionWittGroup }) {
  const { startLoading, finallyLoading } = useLoading()
  const router = useRouter()
  const handleDelete = async (id: number) => {
    startLoading()
    try {
      const res = await requestApi.permission.delete(id)
      toast.success(res.message)
      router.refresh()
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      finallyLoading()
    }
  }
  const handleChangeStatus = async (permission: PermissionWittGroup) => {
    startLoading()
    try {
      const res = await requestApi.permission.update(permission.id, { isActive: !permission.isActive })
      toast.success(res.message)
      router.refresh()
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
        <DropdownMenuItem onClick={() => handleDelete(permission.id)}>Delete permission</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeStatus(permission)}>
          {permission.isActive ? 'Disable permission' : 'Enable'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
