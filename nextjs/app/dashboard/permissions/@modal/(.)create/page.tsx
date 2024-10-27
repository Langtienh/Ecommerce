import Modal from '@/components/modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import resourceRequestApi from '@/services/author/resource-request'
import FormPemission from '../../components/form-edit-add'

export default async function CreatePage() {
  const res = await resourceRequestApi.getAll({ limit: -1 })
  const resources = res.data.result
  return (
    <Modal>
      <Card>
        <CardHeader>
          <CardTitle>Thêm mới permission</CardTitle>
        </CardHeader>
        <CardContent>
          <FormPemission resources={resources} />
        </CardContent>
      </Card>
    </Modal>
  )
}
