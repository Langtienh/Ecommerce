import Modal from '@/components/modal'
import { requestApi } from '@/services'
import { notFound } from 'next/navigation'
import Groups from '../../../add-edit-group'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  try {
    const [groupsResponse, resourceResponse] = await Promise.all([
      requestApi.group.getMany({ limit: -1, resourceId: +id }),
      requestApi.resource.getById(+id)
    ])
    const resource = resourceResponse.data
    const groups = groupsResponse.data.result
    return (
      <Modal title={`${resource.name} resource`} description={resource.description}>
        <Groups groups={groups} resource={resource} />
      </Modal>
    )
  } catch {
    notFound()
  }
}
