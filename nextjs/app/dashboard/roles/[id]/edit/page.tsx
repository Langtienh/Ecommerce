import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import resourceRequestApi from '@/services/author/resource-request'
import roleRequestApi from '@/services/author/role-request'
import { notFound } from 'next/navigation'
import FormRole from '../../components/form-edit-add'

export default async function Editpermission({
  params: { id },
  searchParams
}: {
  params: {
    id: string
  }
  searchParams: {
    page?: number
    limit?: number
    reourceId?: number
  }
}) {
  try {
    const res = await roleRequestApi.getById(Number(id))
    const role = res.data
    const res2 = await resourceRequestApi.getAllPermission(searchParams)
    const resources = res2.data.result
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle>{`${role.name} role`}</CardTitle>
          <CardDescription>{`Chỉnh sửa ${role.name} role`}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormRole role={role} resources={resources} />
        </CardContent>
      </Card>
    )
  } catch {
    notFound()
  }
}
