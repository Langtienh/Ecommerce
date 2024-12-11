import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { permissionRequest } from '@/services/permission'
import { resourceRequest } from '@/services/resource'
import { notFound } from 'next/navigation'
import FormPemission from '../../components/permission.edit-add'

export default async function Editpermission({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await permissionRequest.findOne(Number(id))
    const permission = res.data
    const res2 = await resourceRequest.findMany({ limit: '-1' })
    const resources = res2.data.result
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle>{`${permission.name} permission`}</CardTitle>
          <CardDescription>{`Chỉnh sửa ${permission.name} permission`}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormPemission permission={permission} resources={resources} />
        </CardContent>
      </Card>
    )
  } catch {
    notFound()
  }
}
