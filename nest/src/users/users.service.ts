import { queryHelper } from '@/base/query-helper'
import { Role } from '@/roles/entities/role.entity'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcrypt'
import { ILike, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { QueryUser } from './dto/query-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserStatus } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

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
      throw new ConflictException('Email đã được sử dụng')
    }
    return user
  }

  async create(createUserDto: CreateUserDto) {
    const { email, name, avatar, phone, roleId, status } = createUserDto
    await this.isEmailExist(createUserDto.email)
    const role = await this.roleRepo.findOne({ where: { id: roleId || 1 } })
    if (!role) {
      throw new NotFoundException('Không tìm thấy role')
    }
    const password = await this.hashPassword(createUserDto.password)
    const user = this.userRepo.create({ email, name, avatar, phone, status, password, role })
    return this.userRepo.save(user)
  }

  async findAll(query: QueryUser) {
    const { page, limit, search, order, where, skip, take } = queryHelper.buildQuery(query, User)
    const [result, totalItem] = await this.userRepo.findAndCount({
      order,
      take,
      skip,
      relations: { role: true },
      where: [
        {
          name: search ? ILike(`%${search}%`) : undefined,
          ...where
        },
        {
          phone: search ? ILike(`%${search}%`) : undefined,
          ...where
        },
        {
          email: search ? ILike(`%${search}%`) : undefined,
          ...where
        }
      ]
    })
    const totalPage = Math.ceil(totalItem / limit)
    const meta = { totalItem, totalPage, page, limit }
    return { meta, result }
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('Không tìm thấy user')
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    const roleId = updateUserDto.roleId
    if (roleId) {
      const role = await this.roleRepo.findOne({ where: { id: roleId } })
      if (!role) {
        throw new NotFoundException('Không tìm thấy role')
      }
      user.role = role
    }
    Object.assign(user, updateUserDto)
    return this.userRepo.save(user)
  }

  remove(id: number, isSoftDelete: boolean) {
    if (!isSoftDelete) {
      return this.userRepo.delete(id)
    }
    try {
      return this.userRepo.softDelete(id)
    } catch {
      throw new ConflictException('Không thể xóa user')
    }
  }

  removeMany(ids: number[], isSoftDelete: boolean) {
    if (!isSoftDelete) {
      return this.userRepo.delete(ids)
    }
    try {
      return this.userRepo.softDelete(ids)
    } catch {
      throw new ConflictException('Không thể xóa user')
    }
  }

  async updatePassword(userId: number, password: string) {
    const hashedPassword = await this.hashPassword(password)
    const user = await this.findOne(userId)
    const isPasswordMatch = await this.comparePassword(password, user.password)
    if (isPasswordMatch) {
      throw new ConflictException('Mật khẩu mới không được trùng với mật khẩu cũ')
    }
    return this.userRepo.save({ ...user, password: hashedPassword })
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      throw new ConflictException('Mật khẩu mới không được trùng với mật khẩu cũ')
    }
    const user = await this.findOne(userId)
    const isPasswordMatch = await this.comparePassword(oldPassword, user.password)
    if (!isPasswordMatch) {
      throw new ConflictException('Mật khẩu cũ không đúng')
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
