import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import { notFound } from 'next/navigation'
import FormPemission from '../../components/form-edit-add'

export default async function Editpermission({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await requestApi.permission.getById(Number(id))
    const permission = res.data
    const res2 = await requestApi.resource.getMany({ limit: -1 })
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
