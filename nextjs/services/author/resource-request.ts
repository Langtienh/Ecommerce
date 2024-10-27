import http from '@/lib/http'
// import { unstable_noStore as noStore } from 'next/cache'
import { getOptionWithAccessToken } from '../cookies/auth-cookie'
import { serverRevalidatePath } from '../server-action'
import { AddResourceType } from './author-schema'

const resourceRequestApi = {
  getAll: async ({ limit = 10, page = 1, search, sort }: BaseQuery) => {
    let query = `/authorization/resources?limit=${limit}&page=${page}`
    if (search) {
      query += `&search=${search}`
    }
    if (sort) {
      query += `&sort=${sort}`
    }
    const res = await http.get<Paginate<Resource>>(query)
    return res
  },
  getById: async (id: number) => {
    const res = await http.get<Resource>(`/authorization/resources/${id}`)
    return res
  },
  delete: async (id: number) => {
    const option = await getOptionWithAccessToken()
    const res = await http.delete(`/authorization/resources/${id}`, option)
    await serverRevalidatePath('/dashboard/resources')
    return res
  },
  deleteMany: async (ids: number[]) => {
    const option = await getOptionWithAccessToken()
    const res = await http.delete(`/authorization/resources?ids=${ids.join(',')}`, option)
    await serverRevalidatePath('/dashboard/resources')
    return res
  },
  add: async (data: AddResourceType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.post<Resource>('/authorization/resources', data, option)
    await serverRevalidatePath('/dashboard/resources')
    return res
  },
  update: async (id: number, data: AddResourceType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.patch<Resource>(`/authorization/resources/${id}`, data, option)
    await serverRevalidatePath('/dashboard/resources')
    return res
  }
}
export default resourceRequestApi
