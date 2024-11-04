import http, { NoBody } from '@/lib/http'
import { formatUrl } from '@/lib/utils'
import { cookiesService } from './cookie-services'
import { serverRevalidatePath } from './server-action'

const { getOptionWithAccessToken } = cookiesService
export default class CRUD<GetMany, GetOne, AddUpdateReponse, AddBody, UpdateBody> {
  protected prefix: string
  protected paths: string | string[]
  protected actionsValidate: CRUDAction
  constructor(prefix: string, actionsValidate?: CRUDAction, paths?: string | string[]) {
    this.prefix = prefix
    this.paths = paths ?? `/dashboard/${formatUrl(prefix)}`
    this.actionsValidate = actionsValidate ?? {}
  }

  async getMany(searchParam: Record<string, any>, option?: NoBody) {
    const query = new URLSearchParams(searchParam)
    const res = await http.get<Paginate<GetMany>>(`${this.prefix}?${query.toString()}`, option)
    return res
  }

  async getById(id: number, query?: string, option?: NoBody) {
    const url = query ? `${this.prefix}/${id}?${query}` : `${this.prefix}/${id}`
    const res = await http.get<GetOne>(url, option)
    return res
  }

  async add(data: AddBody, query?: string, option?: NoBody) {
    const url = query ? `${this.prefix}?${query}` : this.prefix
    const res = await http.post<AddUpdateReponse>(url, data, option)
    return res
  }

  async update(id: number, data: UpdateBody, query?: string, option?: NoBody) {
    const url = query ? `${this.prefix}/${id}?${query}` : `${this.prefix}/${id}`
    const res = await http.patch<AddUpdateReponse>(url, data, option)
    return res
  }

  async delete(id: number, query?: string, option?: NoBody) {
    const url = query ? `${this.prefix}/${id}?${query}` : `${this.prefix}/${id}`
    const res = await http.delete(url, option)
    return res
  }

  async deleteMany(ids: number[], query?: string, option?: NoBody) {
    const url = query ? `${this.prefix}?ids=${ids.join(',')}&${query}` : `${this.prefix}?ids=${ids.join(',')}`
    const res = await http.delete(url, option)
    return res
  }
}

export class CrudWithAuth<GetMany, GetOne, AddUpdateReponse, AddBody, UpdateBody> extends CRUD<
  GetMany,
  GetOne,
  AddUpdateReponse,
  AddBody,
  UpdateBody
> {
  constructor(prefix: string, actionsValidate?: CRUDAction, paths?: string | string[]) {
    super(prefix, actionsValidate, paths)
  }
  getMany = async (searchParam: Record<string, any>, option?: NoBody) => {
    const accessTokenOption = await getOptionWithAccessToken()
    return super.getMany(searchParam, { ...accessTokenOption, ...option })
  }
  getById = async (id: number, query?: string, option?: NoBody) => {
    const accessTokenOption = await getOptionWithAccessToken()
    return super.getById(id, query, { ...accessTokenOption, ...option })
  }
  add = async (data: AddBody, query?: string, option?: NoBody) => {
    const accessTokenOption = await getOptionWithAccessToken()
    const res = super.add(data, query, { ...accessTokenOption, ...option })
    if (this.actionsValidate.add) await serverRevalidatePath(this.paths)
    return res
  }
  update = async (id: number, data: UpdateBody, query?: string, option?: NoBody) => {
    const accessTokenOption = await getOptionWithAccessToken()
    const res = super.update(id, data, query, { ...accessTokenOption, ...option })
    if (this.actionsValidate.update) await serverRevalidatePath(this.paths)
    return res
  }
  delete = async (id: number, query?: string, option?: NoBody) => {
    const accessTokenOption = await getOptionWithAccessToken()
    const res = await super.delete(id, query, { ...accessTokenOption, ...option })
    if (this.actionsValidate.delete) await serverRevalidatePath(this.paths)
    return res
  }
  deleteMany = async (ids: number[], query?: string, option?: NoBody) => {
    const accessTokenOption = await getOptionWithAccessToken()
    const res = await super.deleteMany(ids, query, { ...accessTokenOption, ...option })
    if (this.actionsValidate.deleteMany) await serverRevalidatePath(this.paths)
    return res
  }
}

type CRUDAction = {
  add?: boolean
  update?: boolean
  delete?: boolean
  deleteMany?: boolean
}
