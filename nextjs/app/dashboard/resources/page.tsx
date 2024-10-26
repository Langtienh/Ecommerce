import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import resourceRequestApi from '@/services/author/resource-request'
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
  const res = await resourceRequestApi.getAll(searchParams)
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Tài nguyên</CardTitle>
        <CardDescription>Quản lý tài nguyên của dự án</CardDescription>
      </CardHeader>
      <CardContent>
        <ResourceTable data={res.data} />
      </CardContent>
    </Card>
  )
}
