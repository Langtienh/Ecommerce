// import { Injectable } from '@nestjs/common'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'
// import { ICrudServices } from '@/core/crud/crud.interface'
// import { PaginationResponse } from '@/lib/pagination/pagination.interface'
// import { QueryBase } from '@/lib/query-helper/query.interface'

// @Injectable()
// export class UserService implements ICrudServices {
//   async create(data: CreateUserDto): Promise<any> {
//     return data
//   }

//   async update(id: number, data: UpdateUserDto): Promise<any> {
//     return data
//   }

//   async delete(id: number): Promise<any> {
//     return id
//   }

//   async deleteMany(ids: number[]): Promise<any> {
//     return ids
//   }

//   async findMany(query: QueryBase): Promise<PaginationResponse> {
//     return {
//       meta: {
//         page: 1,
//         limit: 10,
//         totalPage: 1,
//         totalItem: 1
//       },
//       result: []
//     }
//   }

//   async findOne(id: number): Promise<any> {
//     return id
//   }
// }
