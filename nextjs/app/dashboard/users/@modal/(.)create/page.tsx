import Modal from '@/components/modal'
import { requestApi } from '@/services'
import FormRole from '../../components/form-edit-add'

export default async function CreatePage() {
  const res = await requestApi.role.getMany({ limit: -1 })
  const roles = res.data.result
  return (
    <Modal className='max-w-[800px]' title='Thêm người dùng mới'>
      <FormRole roles={roles} />
    </Modal>
  )
}
