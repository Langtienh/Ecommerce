import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import { notFound } from 'next/navigation'
import FormEditResource from '../../create/form-edit-resource'

export default async function EditResource({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await requestApi.resource.getById(Number(id))
    const resource = res.data
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle>{`${resource.name} resource`}</CardTitle>
          <CardDescription>{`Chỉnh sửa ${resource.name} resource`}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormEditResource resource={resource} />
        </CardContent>
      </Card>
    )
  } catch {
    notFound()
  }
}
