'use client'
import { Button } from '@/components/ui/button'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { useRouter } from 'next/navigation'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'sonner'

export default function LogoutButton() {
  const router = useRouter()
  const removeUser = useAccount((state) => state.removeUser)
  const { startLoading, finallyLoading } = useLoading()
  const handleLogout = async () => {
    startLoading()
    try {
      // await authenRequest.logout()
      toast.success('Đăng xuất thành công')
    } finally {
      removeUser()
      finallyLoading()
      router.push('/login')
    }
  }
  return (
    <Button onClick={handleLogout} variant='outline'>
      <FiLogOut />
    </Button>
  )
}
