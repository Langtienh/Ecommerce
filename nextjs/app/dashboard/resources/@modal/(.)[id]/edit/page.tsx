import Modal from '@/components/modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import resourceRequestApi from '@/services/author/resource-request'
import { notFound } from 'next/navigation'
import FormEditResource from '../../../create/form-edit-resource'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await resourceRequestApi.getById(Number(id))
    const resource = res.data
    return (
      <Modal>
        <Card>
          <CardHeader>
            <CardTitle>{`${resource.name} resource`}</CardTitle>
            <CardDescription>{`Chỉnh sửa ${resource.name} resource`}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormEditResource resource={resource} />
          </CardContent>
        </Card>
      </Modal>
    )
  } catch {
    notFound()
  }
}
