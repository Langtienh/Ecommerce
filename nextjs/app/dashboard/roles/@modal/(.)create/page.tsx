import Modal from '@/components/modal'
import resourceRequestApi from '@/services/author/resource-request'
import FormRole from '../../components/form-edit-add'

export default async function CreatePage({
  searchParams
}: {
  searchParams: {
    page?: number
    limit?: number
    reourceId?: number
  }
}) {
  const res = await resourceRequestApi.getAllPermission(searchParams)
  const resources = res.data.result
  return (
    <Modal className='max-w-[800px]' title='Thêm mới role'>
      <FormRole resources={resources} />
    </Modal>
  )
}
