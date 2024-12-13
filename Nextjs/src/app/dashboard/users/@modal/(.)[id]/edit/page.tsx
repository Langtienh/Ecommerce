import { Modal } from '@/components/modal'
import { roleRequest } from '@/services/role'
import { userRequest } from '@/services/user'
import { notFound } from 'next/navigation'
import FormRole from '../../../components/user.form-edit-add'

export default async function EditPage({
  params: { id }
}: {
  params: {
    id: string
  }
}) {
  try {
    const [rolesReponse, userResponse] = await Promise.all([
      roleRequest.findMany({ limit: '-1' }),
      userRequest.findOne(+id)
    ])
    const user = userResponse.data
    const roles = rolesReponse.data.result
    return (
      <Modal
        parentPath='/dashboard/users'
        className='max-w-[800px]'
        title={`USER00${user.id}`}
        description={user.name}
      >
        <FormRole roles={roles} user={user} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
