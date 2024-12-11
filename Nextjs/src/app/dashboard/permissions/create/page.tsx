import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { resourceRequest } from '@/services/resource'
import FormPemission from '../components/permission.edit-add'

export default async function Page() {
  const res = await resourceRequest.findMany({ limit: '-1' })
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
