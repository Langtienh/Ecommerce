import Modal from '@/components/modal'
import groupRequestApi from '@/services/author/group-request'
import resourceRequestApi from '@/services/author/resource-request'
import { notFound } from 'next/navigation'
import Groups from '../../../add-edit-group'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  try {
    const [groupsResponse, resourceResponse] = await Promise.all([
      groupRequestApi.getAll({ limit: -1, resourceId: +id }),
      resourceRequestApi.getById(+id)
    ])

    return (
      <Modal>
        <Groups groups={groupsResponse.data.result} resource={resourceResponse.data} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
