import http from '@/lib/http'
import authenRequestApi from '../authen/authen-request'
import { serverRevalidatePath } from '../server-action'
import { AddRoleType } from './author-schema'

const roleRequestApi = {
  getAll: async ({ limit = 10, page = 1, search, sort }: BaseQuery) => {
    let query = `/authorization/roles?limit=${limit}&page=${page}`
    if (search) {
      query += `&search=${search}`
    }
    if (sort) {
      query += `&sort=${sort}`
    }
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.get<Paginate<Role>>(query, option)
    return res
  },
  getById: async (id: number) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.get<RoleDetail>(`/authorization/roles/${id}`, option)
    return res
  },
  delete: async (id: number) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.delete(`/authorization/roles/${id}`, option)
    await serverRevalidatePath('/dashboard/roles')
    return res
  },
  deleteMany: async (ids: number[]) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.delete(`/authorization/roles?ids=${ids.join(',')}`, option)
    await serverRevalidatePath('/dashboard/roles')
    return res
  },
  add: async (data: AddRoleType, permissionIds: number[]) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.post<Permission>('/authorization/roles', { ...data, permissionIds }, option)
    await serverRevalidatePath('/dashboard/roles')
    return res
  },
  update: async (id: number, data: AddRoleType, permissionIds: number[]) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.patch<Permission>(`/authorization/roles/${id}`, { ...data, permissionIds }, option)
    await serverRevalidatePath('/dashboard/roles')
    return res
  }
}
export default roleRequestApi
