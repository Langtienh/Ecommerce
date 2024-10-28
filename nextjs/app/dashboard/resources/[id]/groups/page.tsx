import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import groupRequestApi from '@/services/author/group-request'
import resourceRequestApi from '@/services/author/resource-request'
import { notFound } from 'next/navigation'
import Groups from '../../add-edit-group'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  try {
    const [groupsResponse, resourceResponse] = await Promise.all([
      groupRequestApi.getAll({ limit: -1, resourceId: +id }),
      resourceRequestApi.getById(+id)
    ])
    const resource = resourceResponse.data
    const groups = groupsResponse.data.result
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle>{`${resource.name} resource`}</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Groups groups={groups} resource={resource} />
        </CardContent>
      </Card>
    )
  } catch {
    notFound()
  }
}
