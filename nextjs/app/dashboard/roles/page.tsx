import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import roleRequestApi from '@/services/author/role-request'
import RoleTable from './components/table'

interface RolePageProps {
  searchParams: {
    page?: number
    limit?: number
    search?: string
    sort?: string
  }
}
export default async function RolePage({ searchParams }: RolePageProps) {
  const res = await roleRequestApi.getAll(searchParams)
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
