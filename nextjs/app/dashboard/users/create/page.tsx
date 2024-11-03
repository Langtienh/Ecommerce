import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import FormRole from '../components/form-edit-add'

export default async function EditResource() {
  const res = await requestApi.role.getMany({ limit: -1 })
  const roles = res.data.result
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Thêm người dùng mới</CardTitle>
      </CardHeader>
      <CardContent>
        <FormRole roles={roles} />
      </CardContent>
    </Card>
  )
}
