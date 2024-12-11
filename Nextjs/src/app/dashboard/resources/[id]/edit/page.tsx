import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resourceRequest } from '@/services/resource'
import { notFound } from 'next/navigation'
import FormEditResource from '../../components/resource.form-edit-add'

export default async function EditResource({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await resourceRequest.findOne(Number(id))
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
