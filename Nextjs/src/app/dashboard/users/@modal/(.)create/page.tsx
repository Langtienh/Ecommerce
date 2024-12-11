import { Modal } from '@/components/modal'
import { roleRequest } from '@/services/role'
import FormRole from '../../components/user.form-edit-add'

export default async function CreatePage() {
  const res = await roleRequest.findMany({ limit: '-1' })
  const roles = res.data.result
  return (
    <Modal className='max-w-[800px]' title='Thêm người dùng mới'>
      <FormRole roles={roles} />
    </Modal>
  )
}
