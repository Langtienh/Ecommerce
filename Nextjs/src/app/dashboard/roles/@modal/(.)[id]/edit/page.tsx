import { Modal } from '@/components/modal'
import { SearchParams } from '@/lib/query'
import { permissionRequest } from '@/services/permission'
import { roleRequest } from '@/services/role'
import { notFound } from 'next/navigation'
import FormRole from '../../../components/role.form-edit-add'

export default async function EditPage({
  params: { id },
  searchParams
}: {
  params: {
    id: string
  }
  searchParams: SearchParams
}) {
  try {
    const roleResponse = await roleRequest.findOne(Number(id))
    const role = roleResponse.data
    const permissionReponse = await permissionRequest.findMany({ limit: '-1' })
    const permissions = permissionReponse.data.result
    return (
      <Modal
        className='max-w-[800px]'
        title={`${role.name} role`}
        description={`Chỉnh sửa ${role.name} role`}
      >
        <FormRole permissions={permissions} role={role} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
