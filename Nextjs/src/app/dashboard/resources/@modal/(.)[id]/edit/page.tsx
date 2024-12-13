import { Modal } from '@/components/modal'
import { resourceRequest } from '@/services/resource'
import { notFound } from 'next/navigation'
import FormEditResource from '../../../components/resource.form-edit-add'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await resourceRequest.findOne(Number(id))
    const resource = res.data
    return (
      <Modal
        title={`${resource.name} resource`}
        description={`Chỉnh sửa ${resource.name} resource`}
        parentPath='/dashboard/resources'
      >
        <FormEditResource resource={resource} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
