import Modal from '@/components/modal'
import { requestApi } from '@/services'
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
  const res = await requestApi.resource.getAllPermission(searchParams)
  const resources = res.data.result
  return (
    <Modal className='max-w-[800px]' title='Thêm mới role'>
      <FormRole resources={resources} />
    </Modal>
  )
}
