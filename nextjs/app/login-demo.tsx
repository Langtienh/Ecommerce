'use client'
import { AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import envConfig from '@/config'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import authenRequestApi from '@/services/authen/authen-request'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { toast } from 'sonner'

export default function GetStated() {
  const router = useRouter()
  const setUser = useAccount((state) => state.setUser)
  const { startLoading, finallyLoading } = useLoading()
  const handleLogin = async () => {
    startLoading()
    try {
      const email = envConfig.ADMIN_EMAIL
      const password = envConfig.ADMIN_PASSWORD
      const data = { email, password }
      const res = await authenRequestApi.login(data)
      setUser(res.data.user)
      toast.success(res.message)
      router.push('/dashboard/roles')
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      finallyLoading()
    }
  }
  return (
    <div className='py-4 flex justify-center items-center gap-5'>
      <Button size='lg' variant='outline' asChild>
        <Link rel='noopener noreferrer' target='_blank' href='https://github.com/Langtienh/Ecommerce'>
          <FaGithub className='mr-2' />
          Source code
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size='lg'>Get started</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đăng ký người dùng mới</AlertDialogTitle>
            <AlertDialogDescription>
              Nhiều chức năng thú vị hơn với vai trò admin, chúng tôi cung cấp tài khoản admin demo sẵn, hoặc bạn có thể
              đăng ký tài khoản mới(với email của bạn)
            </AlertDialogDescription>
            <AlertDescription>Tiếp tục với</AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Link href='/register'>Tài khoản mới</Link>
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogin}>Admin account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
