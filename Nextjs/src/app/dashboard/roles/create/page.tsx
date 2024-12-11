import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { permissionRequest } from '@/services/permission'
import FormRole from '../components/role.form-edit-add'

export default async function CreateRolePage() {
  const res = await permissionRequest.findMany({ limit: '-1' })
  const permissions = res.data.result
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Thêm mới role</CardTitle>
      </CardHeader>
      <CardContent>
        <FormRole permissions={permissions} />
      </CardContent>
    </Card>
  )
}
