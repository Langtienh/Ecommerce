import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ICrudServices } from '@/core/crud/crud.interface'
import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase } from '@/lib/query-helper/query.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { User, UserFields } from './entities/user.entity'
import { compare, genSalt, hash } from 'bcrypt'
import { QueryHelper } from '@/lib/query-helper/QueryHelper'

@Injectable()
export class UserService implements ICrudServices {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(data: CreateUserDto): Promise<any> {
    const user = await this.userRepository.create(data)
    return this.userRepository.save(user)
  }

  async update(id: number, data: UpdateUserDto): Promise<any> {
    const user = await this.findOne(id)
    Object.assign(user, data)
    return this.userRepository.save(user)
  }

  async delete(id: number): Promise<any> {
    await this.findOne(id)
    await this.userRepository.delete({ id })
  }

  async deleteMany(ids: number[]): Promise<any> {
    await this.userRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<User>> {
    const { skip, sort, take, where } = QueryHelper.buildQuery(UserFields, query)
    const [result, totalItem] = await this.userRepository.findAndCount({
      where,
      order: sort,
      skip,
      take
    })
    return QueryHelper.buildReponse(result, totalItem, query)
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new Error('Không tìm thấy user')
    return user
  }

  // bcrypt
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    const salt = await genSalt(saltRounds)
    return hash(password, salt)
  }

  comparePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword)
  }
}
