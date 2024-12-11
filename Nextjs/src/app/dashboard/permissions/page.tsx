import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchParams } from '@/lib/query'
import { permissionRequest } from '@/services/permission'
import PermissionTable from './components/permission.table'

export default async function PermissionPage({ searchParams }: { searchParams: SearchParams }) {
  const res = await permissionRequest.findMany(searchParams)
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Permission api</CardTitle>
        <CardDescription>Permission manager</CardDescription>
      </CardHeader>
      <CardContent>
        <PermissionTable data={res.data} />
      </CardContent>
    </Card>
  )
}
