import Modal from '@/components/modal'
import resourceRequestApi from '@/services/author/resource-request'
import FormPemission from '../../components/form-edit-add'

export default async function CreatePage() {
  const res = await resourceRequestApi.getAll({ limit: -1 })
  const resources = res.data.result
  return (
    <Modal title='Thêm mới permission'>
      <FormPemission resources={resources} />
    </Modal>
  )
}
