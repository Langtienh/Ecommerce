import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import resourceRequestApi from '@/services/author/resource-request'
import FormRole from '../components/form-edit-add'

export default async function EditResource({
  searchParams
}: {
  searchParams: {
    page?: number
    limit?: number
    reourceId?: number
  }
}) {
  const res = await resourceRequestApi.getAllPermission(searchParams)
  const resources = res.data.result
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Thêm mới role</CardTitle>
      </CardHeader>
      <CardContent>
        <FormRole resources={resources} />
      </CardContent>
    </Card>
  )
}
