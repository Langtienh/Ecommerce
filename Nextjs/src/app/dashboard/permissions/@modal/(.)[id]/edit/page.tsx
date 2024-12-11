import { Modal } from '@/components/modal'
import { permissionRequest } from '@/services/permission'
import { resourceRequest } from '@/services/resource'
import { notFound } from 'next/navigation'
import FormPemission from '../../../components/permission.edit-add'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await permissionRequest.findOne(Number(id))
    const permission = res.data
    const res2 = await resourceRequest.findMany({ limit: '-1' })
    const resources = res2.data.result
    return (
      <Modal
        title={`${permission.name} permission`}
        description={`Chỉnh sửa ${permission.name} permission`}
      >
        <FormPemission permission={permission} resources={resources} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
