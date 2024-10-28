import Modal from '@/components/modal'
import resourceRequestApi from '@/services/author/resource-request'
import { notFound } from 'next/navigation'
import FormEditResource from '../../../create/form-edit-resource'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await resourceRequestApi.getById(Number(id))
    const resource = res.data
    return (
      <Modal title={`${resource.name} resource`} description={`Chỉnh sửa ${resource.name} resource`}>
        <FormEditResource resource={resource} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
