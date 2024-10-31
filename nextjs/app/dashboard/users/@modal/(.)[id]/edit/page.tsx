import Modal from '@/components/modal'
import { requestApi } from '@/services'
import { notFound } from 'next/navigation'
import FormRole from '../../../components/form-edit-add'

export default async function EditPage({
  params: { id },
  searchParams
}: {
  params: {
    id: string
  }
  searchParams: {
    page?: number
    limit?: number
    reourceId?: number
  }
}) {
  try {
    const res = await requestApi.role.getById(Number(id))
    const role = res.data
    const res2 = await requestApi.resource.getAllPermission(searchParams)
    const resources = res2.data.result
    return (
      <Modal className='max-w-[800px]' title={`${role.name} role`} description={`Chỉnh sửa ${role.name} role`}>
        <FormRole role={role} resources={resources} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
