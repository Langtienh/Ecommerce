import http from '@/lib/http'
// import { unstable_noStore as noStore } from 'next/cache'
import { getOptionWithAccessToken } from '../cookies/auth-cookie'
import { serverRevalidatePath } from '../server-action'
import { AddPermissionType, UpdatePermissionType } from './author-schema'

const formatPermission = (data: PermissionPreFormat): Permission => {
  return {
    ...data,
    groupName: data.group.name,
    resourceId: data.group.resourceId
  }
}

interface PermissionQuery extends BaseQuery {
  status?: string
  method?: string
}

const permissionRequestApi = {
  getAll: async ({ limit = 10, page = 1, search, sort, method, status }: PermissionQuery) => {
    let query = `/authorization/permissions?limit=${limit}&page=${page}`
    if (search) {
      query += `&search=${search}`
    }
    if (sort) {
      query += `&sort=${sort}`
    }
    if (method) {
      query += `&method=${method}`
    }
    if (status) {
      query += `&status=${status}`
    }
    const res = await http.get<Paginate<PermissionPreFormat>>(query, { cache: 'no-store' })
    const result = res.data.result.map((item) => formatPermission(item))
    const data = { ...res.data, result }
    return { ...res, data }
  },
  getById: async (id: number) => {
    const res = await http.get<PermissionPreFormat>(`/authorization/permissions/${id}`)
    const data = formatPermission(res.data)
    return { ...res, data }
  },
  delete: async (id: number) => {
    const option = await getOptionWithAccessToken()
    const res = await http.delete(`/authorization/permissions/${id}`, option)
    await serverRevalidatePath('/dashboard/permissions')
    return res
  },
  deleteMany: async (ids: number[]) => {
    const option = await getOptionWithAccessToken()
    const res = await http.delete(`/authorization/permissions?ids=${ids.join(',')}`, option)
    await serverRevalidatePath('/dashboard/permissions')
    return res
  },
  add: async (data: AddPermissionType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.post<Permission>('/authorization/permissions', data, option)
    await serverRevalidatePath('/dashboard/permissions')
    return res
  },
  update: async (id: number, data: UpdatePermissionType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.patch<Permission>(`/authorization/permissions/${id}`, data, option)
    await serverRevalidatePath('/dashboard/permissions')
    return res
  }
}
export default permissionRequestApi
