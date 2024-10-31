import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import { notFound } from 'next/navigation'
import FormRole from '../../components/form-edit-add'

export default async function Editpermission({
  params: { id },
  searchParams
}: {
  params: {
    id: string
  }
  searchParams: Record<string, any>
}) {
  try {
    const res = await requestApi.role.getById(Number(id))
    const role = res.data
    const res2 = await requestApi.resource.getAllPermission(searchParams)
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
