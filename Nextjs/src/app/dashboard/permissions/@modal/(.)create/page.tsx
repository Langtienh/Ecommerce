import { Modal } from '@/components/modal'
import { resourceRequest } from '@/services/resource'
import FormPemission from '../../components/permission.edit-add'

export default async function CreatePage() {
  const res = await resourceRequest.findMany({ limit: '-1' })
  const resources = res.data.result
  return (
    <Modal title='Thêm mới permission'>
      <FormPemission resources={resources} />
    </Modal>
  )
}
