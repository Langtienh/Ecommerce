import Modal from '@/components/modal'
import { requestApi } from '@/services'
import { notFound } from 'next/navigation'
import FormRole from '../../../components/form-edit-add'

export default async function EditPage({
  params: { id }
}: {
  params: {
    id: string
  }
}) {
  try {
    const [rolesReponse, userResponse] = await Promise.all([
      requestApi.role.getMany({ limit: -1 }),
      requestApi.user.getById(+id)
    ])
    const user = userResponse.data
    const roles = rolesReponse.data.result
    return (
      <Modal className='max-w-[800px]' title={`USER00${user.id}`} description={user.name}>
        <FormRole roles={roles} user={user} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
