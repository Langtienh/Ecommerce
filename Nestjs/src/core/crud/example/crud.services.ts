// import { ICrudServices } from '@/core/crud'
// import { PaginationResponse } from '@/lib/pagination/pagination.interface'
// import { QueryBase, QueryHelper } from '@/lib/query-helper'
// import { Injectable, NotFoundException } from '@nestjs/common'
// import { InjectRepository } from '@nestjs/typeorm'
// import { In, Repository } from 'typeorm'
// import { CreateUserDto, UpdateUserDto } from './dto'

// @Injectable()
// export class UserService implements ICrudServices {
//   constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

//   async create(data: CreateUserDto): Promise<any> {
//     const user = await this.userRepository.create(data)
//     return this.userRepository.save(user)
//   }

//   async update(id: number, data: UpdateUserOption): Promise<any> {
//     const user = await this.findOne(id)
//     Object.assign(user, data)
//     return this.userRepository.save(user)
//   }

//   async delete(id: number): Promise<any> {
//     await this.findOne(id)
//     await this.userRepository.delete({ id })
//   }

//   async deleteMany(ids: number[]): Promise<any> {
//     await this.userRepository.delete({ id: In(ids) })
//   }

//   async findMany(query: QueryBase): Promise<PaginationResponse<User>> {
//     const { skip, order, take, where } = QueryHelper.buildQuery(UserFields, query)
//     const [result, totalItem] = await this.userRepository.findAndCount({
//       where,
//       order,
//       skip,
//       take,
//       withDeleted: true
//     })
//     return QueryHelper.buildReponse(result, totalItem, query)
//   }

//   async findOne(id: number): Promise<any> {
//     const user = await this.userRepository.findOne({ where: { id }, withDeleted: true })
//     if (!user) throw new NotFoundException('Không tìm thấy user')
//     return user
//   }
// }
