import { Modal } from '@/components/modal'
import FormEditResource from '../../components/resource.form-edit-add'

export default function CreatePage() {
  return (
    <Modal title='Thêm mới resource'>
      <FormEditResource />
    </Modal>
  )
}
