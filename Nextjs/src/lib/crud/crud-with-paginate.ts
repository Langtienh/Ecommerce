import { http, NoBody } from '../http'
import { delayFetch } from '../utils'
import { Crud } from './curd.base'

export class CrudWithPaginate<GetMany, GetOne, AddUpdateResponse, AddBody, UpdateBody> extends Crud<
  GetMany,
  GetOne,
  AddUpdateResponse,
  AddBody,
  UpdateBody
> {
  async findMany(searchParams: Record<string, string | string[]>, option?: NoBody) {
    await delayFetch()
    const query = Object.entries(searchParams).reduce((prev, [key, value]) => {
      return `${prev}&${key}=${value}`
    }, `${this.prefix}?`)
    const res = await http.get<Paginate<GetMany>>(query, option)
    return res
  }
}
