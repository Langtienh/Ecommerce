import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import resourceRequestApi from '@/services/author/resource-request'
import FormPemission from '../components/form-edit-add'

export default async function EditResource() {
  const res = await resourceRequestApi.getAll({ limit: -1 })
  const resources = res.data.result
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Thêm mới permission</CardTitle>
      </CardHeader>
      <CardContent>
        <FormPemission resources={resources} />
      </CardContent>
    </Card>
  )
}
