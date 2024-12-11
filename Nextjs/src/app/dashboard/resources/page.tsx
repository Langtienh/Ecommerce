import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchParams } from '@/lib/query'
import { resourceRequest } from '@/services/resource'
import ResourceTable from './components/resource.table'

export default async function ResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  const res = await resourceRequest.findMany(searchParams)
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
