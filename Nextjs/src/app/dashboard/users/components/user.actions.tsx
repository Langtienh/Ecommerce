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
import { User, userRequest } from '@/services/user'
import Link from 'next/link'
import { toast } from 'sonner'

export default function Actions({ user }: { user: User }) {
  const { startLoading, finallyLoading } = useLoading()
  const handleDelete = async (id: number, softDelete?: boolean) => {
    startLoading()
    try {
      const res = softDelete ? await userRequest.softDelete(id) : await userRequest.delete(id)
      toast.success(res.message)
      await serverRevalidatePathAndRedirect('/dashboard/users', 'sort=-updatedAt')
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id.toString())}>
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/users/${user.id}/edit`}>Edit user</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(user.id)}>Delete user</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(user.id, true)}>
          Soft delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
