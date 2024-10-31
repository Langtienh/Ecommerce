import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import PermissionTable from './components/table'

export default async function PermissionPage({ searchParams }: { searchParams: Record<string, any> }) {
  const res = await requestApi.permission.getMany(searchParams)
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
