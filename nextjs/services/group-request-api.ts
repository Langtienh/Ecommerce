import { z } from 'zod'
import { CrudWithAuth } from './core/crud'
import { Permission } from './permission-request-api'
import { Resource } from './resource-request-api'

export interface Group {
  id: number
  name: string
  resourceId: number
}

export interface GroupDetail extends Group {
  permissions: Permission[]
}
export interface GroupWithReource extends Group {
  reource: Resource
}

export const AddGroupSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  resourceId: z.number({ message: 'Resource không được để trống' })
})
export type AddGroupType = z.infer<typeof AddGroupSchema>
export const UpdateGroupSchema = AddGroupSchema.partial()
export type UpdateGroupType = z.infer<typeof UpdateGroupSchema>

class GroupRequestApi extends CrudWithAuth<Group, Group, Group, AddGroupType, UpdateGroupType> {
  constructor() {
    super('authorization/groups', { add: true, update: true, delete: true, deleteMany: true })
  }
}
const groupRequestApi = new GroupRequestApi()
export default groupRequestApi
