import http, { NoBody } from '@/lib/http'
import { getOptionWithAccessToken } from './client-server'
export default class CRUD<GetMany, GetOne, AddUpdateReponse, AddBody, UpdateBody> {
  private prefix: string
  private baseUrl?: string
  private url: string
  constructor(prefix: string, baseUrl?: string) {
    this.prefix = prefix
    this.baseUrl = baseUrl
    if (prefix.startsWith('/')) this.url = `${this.baseUrl ?? ''}${this.prefix}`
    else this.url = `${this.baseUrl ?? ''}/${this.prefix}`
  }

  async getMany(searchParam: Record<string, any>, option?: NoBody) {
    const query = new URLSearchParams(searchParam)
    const res = await http.get<Paginate<GetMany>>(`${this.url}?${query.toString()}`, option)
    return res
  }

  async getById(id: number, option?: NoBody) {
    const res = await http.get<GetOne>(`${this.url}/${id}`, option)
    return res
  }

  async add(data: AddBody, option?: NoBody) {
    const res = await http.post<AddUpdateReponse>(this.url, data, option)
    return res
  }

  async update(id: number, data: UpdateBody, option?: NoBody) {
    const res = await http.patch<AddUpdateReponse>(`${this.url}/${id}`, data, option)
    return res
  }

  async delete(id: number, option?: NoBody) {
    const res = await http.delete(`${this.url}/${id}`, option)
    return res
  }

  async deleteMany(ids: number[], option?: NoBody) {
    const res = await http.delete(`${this.url}?ids=${ids.join(',')}`, option)
    return res
  }
}

export class CRUDWithAccsessToken<GetMany, GetOne, AddUpdateReponse, AddBody, UpdateBody> extends CRUD<
  GetMany,
  GetOne,
  AddUpdateReponse,
  AddBody,
  UpdateBody
> {
  constructor(prefix: string, baseUrl?: string) {
    super(prefix, baseUrl)
  }
  getOptionWithAccessToken = getOptionWithAccessToken
  getMany = async (searchParam: Record<string, any>) => {
    const option = await this.getOptionWithAccessToken()
    return super.getMany(searchParam, option)
  }
  getById = async (id: number) => {
    const option = await this.getOptionWithAccessToken()
    return super.getById(id, option)
  }
  add = async (data: AddBody) => {
    const option = await this.getOptionWithAccessToken()
    return super.add(data, option)
  }
  update = async (id: number, data: UpdateBody) => {
    const option = await this.getOptionWithAccessToken()
    return super.update(id, data, option)
  }
  delete = async (id: number) => {
    const option = await this.getOptionWithAccessToken()
    return super.delete(id, option)
  }
  deleteMany = async (ids: number[]) => {
    const option = await this.getOptionWithAccessToken()
    return super.deleteMany(ids, option)
  }
}
