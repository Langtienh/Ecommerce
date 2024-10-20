import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcrypt'
import { QueryHelper } from 'src/base/query-helper'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { QueryUser } from './dto/query-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserFields, UserStatus } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    const salt = await genSalt(saltRounds)
    return hash(password, salt)
  }

  comparePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword)
  }

  async isEmailExist(email: string) {
    const user = await this.userRepo.findOne({ where: { email }, withDeleted: true })
    if (user) {
      throw new ConflictException('Email already exists')
    }
    return user
  }

  async create(createUserDto: CreateUserDto) {
    await this.isEmailExist(createUserDto.email)
    const password = await this.hashPassword(createUserDto.password)
    return this.userRepo.save({ ...createUserDto, password })
  }

  async findAll(querys: QueryUser) {
    const { page, limit, search, sort, ...fields } = querys
    const queryBuilder = this.userRepo.createQueryBuilder('user')
    if (search) {
      queryBuilder.andWhere('user.email ILIKE :search or user.name ILIKE :search or user.phone ILIKE :search', {
        search: `%${search}%`
      })
    }

    // default
    const order = QueryHelper.toOrder(sort, UserFields)
    const where = QueryHelper.toFilter(fields, UserFields)
    queryBuilder.andWhere(where)
    queryBuilder.orderBy(order)
    queryBuilder.skip((page - 1) * limit).take(limit)

    // result
    const [result, totalItem] = await queryBuilder.getManyAndCount()
    const totalPage = Math.ceil(totalItem / limit)
    const meta = { totalItem, totalPage, page, limit }
    return { meta, result }
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    const updatedUser = this.userRepo.create(updateUserDto)
    Object.assign(user, updatedUser)
    return this.userRepo.save(user)
  }

  remove(id: number) {
    return this.userRepo.softDelete(id)
  }

  async updatePassword(userId: number, password: string) {
    const hashedPassword = await this.hashPassword(password)
    const user = await this.findOne(userId)
    const isPasswordMatch = await this.comparePassword(password, user.password)
    if (isPasswordMatch) {
      throw new ConflictException('New password must be different from old password')
    }
    return this.userRepo.save({ ...user, password: hashedPassword })
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      throw new ConflictException('New password must be different from old password')
    }
    const user = await this.findOne(userId)
    const isPasswordMatch = await this.comparePassword(oldPassword, user.password)
    if (!isPasswordMatch) {
      throw new ConflictException('Old password is incorrect')
    }

    user.password = await this.hashPassword(newPassword)
    return this.userRepo.save(user)
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } })
  }

  async verifyAccount(userId: number) {
    const user = await this.findOne(userId)
    return this.userRepo.save({ ...user, status: UserStatus.VERIFY })
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.findOne(userId)
    return this.userRepo.save({ ...user, refreshToken })
  }

  hidenFiledUser({ password, refreshToken, ...user }: { password: string; refreshToken: string }) {
    return user
  }
}
