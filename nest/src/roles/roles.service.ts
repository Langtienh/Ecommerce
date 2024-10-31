import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { queryHelper } from 'src/base/query-helper'
import { Permission } from 'src/permissions/entities/permission.entity'
import { User } from 'src/users/entities/user.entity'
import { ILike, In, Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { QueryRoleDto } from './dto/query-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'

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
    const { page, limit, search, order, where, skip, take } = queryHelper.buildQuery(query, Role)
    const [result, totalItem] = await this.roleRepo.findAndCount({
      where: {
        ...where,
        name: search ? ILike(`%${search}%`) : undefined
      },
      order,
      skip,
      take
    })
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
      const permissions = await this.permissionRepo.find({ where: { id: In(permissionIds) } })
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
    else throw new ConflictException('Không thể xóa role này vì có user đang sử dụng')
  }

  async removeMany(ids: number[]) {
    const users = await this.userRepo.exists({ where: { roleId: In(ids) } })
    if (!users) return this.roleRepo.delete(ids)
    else throw new ConflictException('Không thể xóa role này vì có user đang sử dụng')
  }

  async getRolePermissions(id: number) {
    return this.roleRepo.find({
      relations: ['permissions'],
      where: { id: id > 0 ? id : undefined },
      order: { id: 'ASC' }
    })
  }
}
