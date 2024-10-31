import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import RoleTable from './components/table'

export default async function RolePage({ searchParams }: { searchParams: Record<string, any> }) {
  const res = await requestApi.role.getMany(searchParams)
  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Role api</CardTitle>
        <CardDescription>Role manager</CardDescription>
      </CardHeader>
      <CardContent>
        <RoleTable data={res.data} />
      </CardContent>
    </Card>
  )
}
