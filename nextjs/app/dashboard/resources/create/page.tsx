import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormEditResource from './form-edit-resource'

export default function EditResource() {
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Thêm mới resource</CardTitle>
      </CardHeader>
      <CardContent>
        <FormEditResource />
      </CardContent>
    </Card>
  )
}
