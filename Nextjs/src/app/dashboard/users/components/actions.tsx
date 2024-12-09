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
import { User, userRequest } from '@/services/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Actions({ user }: { user: User }) {
  const { startLoading, finallyLoading } = useLoading()
  const router = useRouter()
  const handleDelete = async (id: number, softDelete?: boolean) => {
    startLoading()
    try {
      const res = softDelete ? await userRequest.delete(id) : await userRequest.softDelete(id)
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
