import http from '@/lib/http'
// import { unstable_noStore as noStore } from 'next/cache'
import { getOptionWithAccessToken } from '../cookies/auth-cookie'
import { serverRevalidatePath } from '../server-action'
import { AddGroupType } from './author-schema'

interface GroupQuery extends BaseQuery {
  resourceId?: number
}

const groupRequestApi = {
  getAll: async ({ limit = 10, page = 1, search, sort, resourceId }: GroupQuery) => {
    let query = `/authorization/groups?limit=${limit}&page=${page}`
    if (search) {
      query += `&search=${search}`
    }
    if (sort) {
      query += `&sort=${sort}`
    }
    if (resourceId) {
      query += `&resourceId=${resourceId}`
    }
    const res = await http.get<Paginate<Group>>(query)
    return res
  },
  getById: async (id: number) => {
    const res = await http.get<Group>(`/authorization/groups/${id}`)
    return res
  },
  delete: async (id: number) => {
    const option = await getOptionWithAccessToken()
    const res = await http.delete(`/authorization/groups/${id}`, option)
    await serverRevalidatePath('/dashboard/groups')
    return res
  },
  deleteMany: async (ids: number[]) => {
    const option = await getOptionWithAccessToken()
    const res = await http.delete(`/authorization/groups?ids=${ids.join(',')}`, option)
    await serverRevalidatePath('/dashboard/groups')
    return res
  },
  add: async (data: AddGroupType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.post<Group>('/authorization/groups', data, option)
    await serverRevalidatePath('/dashboard/groups')
    return res
  },
  update: async (id: number, data: AddGroupType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.patch<Group>(`/authorization/groups/${id}`, data, option)
    await serverRevalidatePath('/dashboard/groups')
    return res
  }
}
export default groupRequestApi
