import { NoBody, http } from '@/lib/http'
import { delayAction } from '../utils'

export class Crud<GetMany, GetOne, AddUpdateResponse, AddBody, UpdateBody> {
  protected prefix: string
  constructor(prefix: string) {
    this.prefix = prefix
  }

  async findOne(id: number, option?: NoBody) {
    const res = await http.get<GetOne>(`${this.prefix}/${id}`, option)
    return res
  }

  async create(data: AddBody, option?: NoBody) {
    await delayAction()
    const res = await http.post<AddUpdateResponse>(this.prefix, data, option)
    return res
  }

  async update(id: number, data: UpdateBody, option?: NoBody) {
    await delayAction()
    const res = await http.patch<AddUpdateResponse>(`${this.prefix}/${id}`, data, option)
    return res
  }

  async delete(id: number, option?: NoBody) {
    await delayAction()
    const res = await http.delete(`${this.prefix}/${id}`, option)
    return res
  }

  async deleteMany(ids: number[], option?: NoBody) {
    await delayAction()
    const url = `${this.prefix}?ids=${ids}`
    const res = await http.delete(url, option)
    return res
  }
}
