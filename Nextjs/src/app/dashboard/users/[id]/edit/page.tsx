import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { roleRequest } from '@/services/role'
import { userRequest } from '@/services/user'
import { notFound } from 'next/navigation'
import FormRole from '../../components/form-edit-add'

export default async function Editpermission({
  params: { id }
}: {
  params: {
    id: string
  }
}) {
  try {
    const [rolesReponse, userResponse] = await Promise.all([
      roleRequest.findMany({ limit: '-1' }),
      userRequest.findOne(+id)
    ])
    const user = userResponse.data
    const roles = rolesReponse.data.result
    return (
      <Card className='m-5'>
        <CardHeader>
          <CardTitle>{`USER00${user.id}`}</CardTitle>
          <CardDescription>{user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormRole roles={roles} user={user} />
        </CardContent>
      </Card>
    )
  } catch {
    notFound()
  }
}
