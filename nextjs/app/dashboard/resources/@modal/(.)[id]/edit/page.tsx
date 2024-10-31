import Modal from '@/components/modal'
import { notFound } from 'next/navigation'
import FormEditResource from '../../../create/form-edit-resource'
import { requestApi } from '@/services'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await requestApi.resource.getById(Number(id))
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
