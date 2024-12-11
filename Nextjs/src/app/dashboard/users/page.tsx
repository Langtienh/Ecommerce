import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { roleRequest } from '@/services/role'
import { userRequest } from '@/services/user'
import Table from './components/user.table'

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  try {
    const [userResponse, roleResponse] = await Promise.all([
      userRequest.findMany(searchParams),
      roleRequest.findMany({ limit: '-1' })
    ])
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle className='text-3xl'>User api</CardTitle>
          <CardDescription>User manager</CardDescription>
        </CardHeader>
        <CardContent>
          <Table roles={roleResponse.data.result} data={userResponse.data} />
        </CardContent>
      </Card>
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
