import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchParams } from '@/lib/query'
import { roleRequest } from '@/services/role'
import RoleTable from './components/role.table'

export default async function RolePage({ searchParams }: { searchParams: SearchParams }) {
  const res = await roleRequest.findMany(searchParams)
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
