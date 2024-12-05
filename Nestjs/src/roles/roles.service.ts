import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { IRolesService } from './abstract'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { Role, roleFields } from './entities/role.entity'

// todo: xử lý roleLevel
@Injectable()
export class RolesService implements IRolesService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}
  async checkExistRoleByName(name?: string): Promise<boolean> {
    if (!name) return false
    return this.roleRepository.existsBy({ name })
  }

  async create(data: CreateRoleDto): Promise<any> {
    const isExist = await this.checkExistRoleByName(data.name)
    if (isExist) throw new ConflictException('Tên role đã tồn tại')
    const role = await this.roleRepository.create(data)
    // todo: xử lý rolePermission
    return this.roleRepository.save(role)
  }

  async update(id: number, data: UpdateRoleDto): Promise<any> {
    const isExist = await this.checkExistRoleByName(data.name)
    if (isExist) throw new ConflictException('Tên role đã tồn tại')
    const role = await this.findOne(id)
    // todo: xử lý rolePermission
    Object.assign(role, data)
    return this.roleRepository.save(role)
  }

  async delete(id: number): Promise<any> {
    await this.findOne(id)
    await this.roleRepository.delete({ id })
  }

  async deleteMany(ids: number[]): Promise<any> {
    await this.roleRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<Role>> {
    const { skip, order, take, where } = QueryHelper.buildQuery(roleFields, query)
    const [result, totalItem] = await this.roleRepository.findAndCount({
      where,
      order,
      skip,
      take
    })
    return QueryHelper.buildReponse(result, totalItem, query)
  }

  async findOne(id: number): Promise<any> {
    const role = await this.roleRepository.findOne({ where: { id } })
    if (!role) throw new NotFoundException('Role not found')
    return role
  }
}
