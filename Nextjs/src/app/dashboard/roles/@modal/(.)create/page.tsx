import { Modal } from '@/components/modal'
import { permissionRequest } from '@/services/permission'
import FormRole from '../../components/role.form-edit-add'

export default async function CreateRolePage() {
  const res = await permissionRequest.findMany({ limit: '-1' })
  const permissions = res.data.result
  return (
    <Modal parentPath='/dashboard/roles' className='max-w-[800px]' title='Thêm mới role'>
      <FormRole permissions={permissions} />
    </Modal>
  )
}
