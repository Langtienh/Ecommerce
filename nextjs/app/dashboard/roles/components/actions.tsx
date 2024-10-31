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
import { Role } from '@/services/role-request-api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Actions({ role }: { role: Role }) {
  const { startLoading, finallyLoading } = useLoading()
  const router = useRouter()
  const handleDelete = async (id: number) => {
    startLoading()
    try {
      const res = await requestApi.role.delete(id)
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.id.toString())}>
          Copy role ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/roles/${role.id}/edit`}>Edit role</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(role.id)}>Delete role</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
