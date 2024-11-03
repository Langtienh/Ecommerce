import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import ResourceTable from './resource-table'

interface ResourcesPageProps {
  searchParams: {
    page?: number
    limit?: number
    search?: string
    sort?: string
  }
}
export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  // thử nghiệm sử dụng phân trang ở client
  const res = await requestApi.resource.getMany({ limit: '-1' })
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
        <CardDescription>Resources manager</CardDescription>
      </CardHeader>
      <CardContent>
        <ResourceTable data={res.data} />
      </CardContent>
    </Card>
  )
}
