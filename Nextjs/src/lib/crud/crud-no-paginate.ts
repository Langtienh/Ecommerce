import { http, NoBody } from '../http'
import { delayFetch } from '../utils'
import { Crud } from './curd.base'

export class CrudNoGetMany<GetMany, GetOne, AddUpdateResponse, AddBody, UpdateBody> extends Crud<
  GetMany,
  GetOne,
  AddUpdateResponse,
  AddBody,
  UpdateBody
> {
  async findMany(option?: NoBody) {
    await delayFetch()
    // const query = searchParams
    //   ? Object.entries(searchParams).reduce((prev, [key, value]) => {
    //       return `${prev}&${key}=${value}`
    //     }, `${this.prefix}?`)
    //   : this.prefix
    const query = this.prefix
    const res = await http.get<GetMany[]>(query, option)
    return res
  }
}
