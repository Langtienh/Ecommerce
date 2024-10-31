import Modal from '@/components/modal'
import { requestApi } from '@/services'
import FormPemission from '../../components/form-edit-add'

export default async function CreatePage() {
  const res = await requestApi.resource.getMany({ limit: -1 })
  const resources = res.data.result
  return (
    <Modal title='Thêm mới permission'>
      <FormPemission resources={resources} />
    </Modal>
  )
}
