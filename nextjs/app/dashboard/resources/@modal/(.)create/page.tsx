import Modal from '@/components/modal'
import FormEditResource from '../../create/form-edit-resource'

export default function CreatePage() {
  return (
    <Modal title='Thêm mới resource'>
      <FormEditResource />
    </Modal>
  )
}
