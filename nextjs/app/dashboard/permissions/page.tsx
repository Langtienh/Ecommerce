import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import permissionRequestApi from '@/services/author/permission-request'
import PermissionTable from './components/table'

interface PermissionPageProps {
  searchParams: {
    page?: number
    limit?: number
    search?: string
    sort?: string
    status?: string
    method?: string
  }
}
export default async function PermissionPage({ searchParams }: PermissionPageProps) {
  const status = searchParams.status?.split(',')
  const methods = searchParams.method?.split(',') as HTTP_METHOD[] | undefined
  const res = await permissionRequestApi.getAll(searchParams)
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Permission api</CardTitle>
        <CardDescription>Permission manager</CardDescription>
      </CardHeader>
      <CardContent>
        <PermissionTable data={res.data} methods={methods} status={status} />
      </CardContent>
    </Card>
  )
}
