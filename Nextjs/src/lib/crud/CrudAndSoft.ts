import { http, NoBody } from '../http'
import { Crud } from './Crud'

export class CrudAndSoft<GetMany, GetOne, AddUpdateResponse, AddBody, UpdateBody> extends Crud<
  GetMany,
  GetOne,
  AddUpdateResponse,
  AddBody,
  UpdateBody
> {
  async softDelete(id: number, option?: NoBody) {
    const res = await http.delete(`${this.prefix}/soft-delete/${id}`, option)
    return res
  }
}
