import Modal from '@/components/modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import permissionRequestApi from '@/services/author/permission-request'
import resourceRequestApi from '@/services/author/resource-request'
import { notFound } from 'next/navigation'
import FormPemission from '../../../components/form-edit-add'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await permissionRequestApi.getById(Number(id))
    const permission = res.data
    const res2 = await resourceRequestApi.getAll({ limit: -1 })
    const resources = res2.data.result
    return (
      <Modal>
        <Card>
          <CardHeader>
            <CardTitle>{`${permission.name} permission`}</CardTitle>
            <CardDescription>{`Chỉnh sửa ${permission.name} permission`}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormPemission permission={permission} resources={resources} />
          </CardContent>
        </Card>
      </Modal>
    )
  } catch {
    notFound()
  }
}
