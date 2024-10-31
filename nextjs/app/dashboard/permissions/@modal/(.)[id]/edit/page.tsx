import Modal from '@/components/modal'
import { requestApi } from '@/services'
import { notFound } from 'next/navigation'
import FormPemission from '../../../components/form-edit-add'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await requestApi.permission.getById(Number(id))
    const permission = res.data
    const res2 = await requestApi.resource.getMany({ limit: -1 })
    const resources = res2.data.result
    return (
      <Modal title={`${permission.name} permission`} description={`Chỉnh sửa ${permission.name} permission`}>
        <FormPemission permission={permission} resources={resources} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
