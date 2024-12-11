import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchParams } from '@/lib/query'
import { permissionRequest } from '@/services/permission'
import { roleRequest } from '@/services/role'
import { notFound } from 'next/navigation'
import FormRole from '../../components/role.form-edit-add'

export default async function Editpermission({
  params: { id },
  searchParams
}: {
  params: {
    id: string
  }
  searchParams: SearchParams
}) {
  try {
    const roleResponse = await roleRequest.findOne(Number(id))
    const role = roleResponse.data
    const permissionReponse = await permissionRequest.findMany({ limit: '-1' })
    const permissions = permissionReponse.data.result
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle>{`${role.name} role`}</CardTitle>
          <CardDescription>{`Chỉnh sửa ${role.name} role`}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormRole permissions={permissions} role={role} />
        </CardContent>
      </Card>
    )
  } catch {
    notFound()
  }
}
