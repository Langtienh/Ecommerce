import http from '@/lib/http'
import authenRequestApi from '../authen/authen-request'
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
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.get<Paginate<Group>>(query, option)
    return res
  },
  getById: async (id: number) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.get<Group>(`/authorization/groups/${id}`, option)
    return res
  },
  delete: async (id: number) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.delete(`/authorization/groups/${id}`, option)
    return res
  },
  deleteMany: async (ids: number[]) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.delete(`/authorization/groups?ids=${ids.join(',')}`, option)
    return res
  },
  add: async (data: AddGroupType) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.post<Group>('/authorization/groups', data, option)
    return res
  },
  update: async (id: number, data: AddGroupType) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.patch<Group>(`/authorization/groups/${id}`, data, option)
    return res
  }
}
export default groupRequestApi
