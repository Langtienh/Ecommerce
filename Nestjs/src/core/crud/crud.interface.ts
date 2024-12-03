import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { ParamIdDto, QueryBase, QueryIdsDto } from '@/lib/query-helper/query.interface'

export interface ICrudServices {
  create(data: Record<string, any>): Promise<any>
  update(id: number, data: Record<string, any>): Promise<any>
  delete(id: number): Promise<void>
  deleteMany(ids: number[]): Promise<void>
  findMany(query: QueryBase): Promise<PaginationResponse>
  findOne(id: number): Promise<any>
}

export interface ICrudController {
  create(data: Record<string, any>): Promise<any>
  update({ id }: ParamIdDto, data: Record<string, any>): Promise<any>
  delete({ id }: ParamIdDto): Promise<any>
  deleteMany({ ids }: QueryIdsDto): Promise<any>
  findMany(query: QueryBase): Promise<any>
  findOne({ id }: ParamIdDto): Promise<any>
}
