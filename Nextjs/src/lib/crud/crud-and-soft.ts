import { http, NoBody } from '../http'
import { CrudWithPaginate } from './crud-with-paginate'

export class CrudAndSoft<
  GetMany,
  GetOne,
  AddUpdateResponse,
  AddBody,
  UpdateBody
> extends CrudWithPaginate<GetMany, GetOne, AddUpdateResponse, AddBody, UpdateBody> {
  async softDelete(id: number, option?: NoBody) {
    const res = await http.delete(`${this.prefix}/soft-delete/${id}`, option)
    return res
  }
}
