import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryHelper } from 'src/base/query-helper'
import { Permission } from 'src/permissions/entities/permission.entity'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { QueryRoleDto } from './dto/query-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role, roleFields } from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async isExistName(name: string, roleId?: number) {
    const role = await this.roleRepo.findOne({ where: { name }, withDeleted: true })
    if (role && role.id !== roleId) {
      throw new ConflictException('Role already exists')
    }
    return role
  }

  async create(createRoleDto: CreateRoleDto) {
    const { name, permissionIds } = createRoleDto
    await this.isExistName(name)
    const permissions = await this.permissionRepo.findByIds(permissionIds)
    if (permissions.length !== permissionIds.length) {
      throw new NotFoundException('Some permission not found')
    }
    const role = this.roleRepo.create(createRoleDto)
    role.permissions = permissions
    return this.roleRepo.save(role)
  }

  async findAll(query: QueryRoleDto) {
    const { page, limit, search, sort, ...filter } = query
    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0')
    }
    const skip = (page - 1) * limit
    const where = QueryHelper.toFilter(filter, roleFields)
    const order = QueryHelper.toOrder(sort, roleFields)
    const queryBuilder = this.roleRepo.createQueryBuilder('role')
    if (limit > 0) queryBuilder.take(limit).skip(skip)
    queryBuilder.where(where).orderBy(order)
    if (search) {
      queryBuilder.andWhere('role.name LIKE :search', {
        search: `%${search}%`
      })
    }
    const [result, totalItem] = await queryBuilder.getManyAndCount()
    const totalPage = limit > 0 ? Math.ceil(totalItem / limit) : 1
    const meta = { totalItem, totalPage, page, limit }
    return { meta, result }
  }

  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id }, relations: ['permissions'] })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissionIds } = updateRoleDto
    const role = await this.roleRepo.findOne({ where: { id } })
    if (!role) {
      throw new NotFoundException('Role not found')
    }
    if (updateRoleDto.name) await this.isExistName(updateRoleDto.name, id)
    Object.assign(role, updateRoleDto)
    if (permissionIds) {
      const permissions = await this.permissionRepo.findByIds(permissionIds)
      if (permissions.length !== permissionIds.length) {
        throw new NotFoundException('Some permission not found')
      }
      role.permissions = permissions
    }
    return this.roleRepo.save(role)
  }

  async remove(id: number) {
    const users = await this.userRepo.exists({ where: { roleId: id } })
    if (!users) return this.roleRepo.delete(id)
    return await this.roleRepo.softDelete(id)
  }
}
