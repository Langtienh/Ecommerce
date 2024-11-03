import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestApi } from '@/services'
import Table from './components/table'

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  try {
    const [userResponse, roleResponse] = await Promise.all([
      requestApi.user.getMany(searchParams),
      requestApi.role.getMany({ limit: -1 })
    ])
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle>User api</CardTitle>
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
