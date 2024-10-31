import http from '@/lib/http'
import { z } from 'zod'
import { CRUDWithAccsessToken } from './CRUD.class'
import { GroupDetail } from './group-request-api'

export interface Resource {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  creatorId: number
  updaterId: number
}

export interface ResourceDetail extends Resource {
  groups: GroupDetail[]
}

export const AddResourceSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  description: z.string({ message: 'Mô tả không được để trống' })
})
export const UpdateResourceSchema = AddResourceSchema.partial()
export type AddResourceType = z.infer<typeof AddResourceSchema>
export type UpdateResourceType = z.infer<typeof UpdateResourceSchema>

class ResourceRequestApi extends CRUDWithAccsessToken<
  Resource,
  Resource,
  Resource,
  AddResourceType,
  UpdateResourceType
> {
  constructor() {
    super('/authorization/resources')
  }
  getAllPermission = async (searchParams: Record<string, any>) => {
    const resourceId = Number(searchParams['resourceId']) || -1
    const limit = Number(searchParams['limit']) || -1
    const page = Number(searchParams['page']) || 1
    const option = await this.getOptionWithAccessToken()
    let query = `/authorization/resources/${resourceId}/permissions?limit=${limit}&page=${page}`
    const res = await http.get<Paginate<ResourceDetail>>(query, option)
    return res
  }
}
const resourceRequestApi = new ResourceRequestApi()
export default resourceRequestApi
