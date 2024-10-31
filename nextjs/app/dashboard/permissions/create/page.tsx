import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import FormPemission from '../components/form-edit-add'

export default async function Page() {
  const res = await requestApi.resource.getMany({ limit: -1 })
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
