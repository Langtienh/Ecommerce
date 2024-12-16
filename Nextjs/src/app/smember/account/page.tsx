import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { meRequest } from '@/services/me'
import { redirect } from 'next/navigation'
import UploadAvatar from './avatar'
import FormChangeInfo from './form-change-info'

export default async function Page() {
  try {
    const res = await meRequest.get()
    return (
      <Card className='w-full max-w-[600px] mx-auto'>
        <CardContent>
          <CardHeader>
            <UploadAvatar user={res.data} />
          </CardHeader>
          <CardTitle className='text-2xl'>Cập nhật thông tin cá nhân</CardTitle>
          <CardDescription>Có thể cập nhật số điện thoại, tên hoặc địa chỉ của bạn</CardDescription>
          <FormChangeInfo user={res.data} />
        </CardContent>
      </Card>
    )
  } catch {
    redirect('/login')
  }
}
