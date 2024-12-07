import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcrypt'
import { In, Repository } from 'typeorm'
import { IUsersService } from './abstract'
import { CreateUserDto, UpdateUserOption } from './dto/create-user.dto'
import { User, UserFields } from './entities/user.entity'

@Injectable()
export class UserService implements IUsersService {
  private readonly logger = new Logger(UserService.name)
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async checkExistUserByEmail(email: string): Promise<boolean> {
    if (!email) return false
    return this.userRepository.existsBy({ email })
  }

  async create(data: CreateUserDto) {
    const isExist = await this.checkExistUserByEmail(data.email)
    if (isExist) throw new ConflictException('Email đã tồn tại')
    const hashPassword = await this.hashPassword(data.password)
    Object.assign(data, { password: hashPassword })
    const user = await this.userRepository.create(data)
    return this.userRepository.save(user)
  }

  async initializeData(data: CreateUserDto[]) {
    const count = await this.userRepository.count()
    if (count) return
    if (data.length === 0) return
    const hashPassword = await this.hashPassword(data[0].password)
    await this.userRepository.save(data.map((user) => ({ ...user, password: hashPassword })))
    this.logger.log('Users Initialized')
  }

  async update(id: number, data: UpdateUserOption) {
    const user = await this.findOne(id)
    Object.assign(user, data)
    return this.userRepository.save(user)
  }

  async delete(id: number) {
    await this.findOne(id)
    await this.userRepository.delete({ id })
  }

  async deleteMany(ids: number[]) {
    await this.userRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<User>> {
    const { skip, order, take, where } = QueryHelper.buildQuery(UserFields, query)
    const [result, totalItem] = await this.userRepository.findAndCount({
      where,
      order,
      skip,
      take,
      withDeleted: true
    })
    return QueryHelper.buildReponse(result, totalItem, query)
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, withDeleted: true })
    if (!user) throw new NotFoundException('Không tìm thấy user')
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
