import Modal from '@/components/modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormEditResource from '../../create/form-edit-resource'

export default function CreatePage() {
  return (
    <Modal>
      <Card>
        <CardHeader>
          <CardTitle>Thêm mới resource</CardTitle>
        </CardHeader>
        <CardContent>
          <FormEditResource />
        </CardContent>
      </Card>
    </Modal>
  )
}
