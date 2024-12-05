import { ICrudServices } from '@/core/crud'
import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdateReourceDto } from './dto/update-permission.dto'
import { Permission, permissionFields } from './entities/permission.entity'

@Injectable()
export class PermissionService implements ICrudServices {
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
  ) {}
  async create(data: CreatePermissionDto): Promise<any> {
    return this.permissionRepository.save(data)
  }

  async update(id: number, data: UpdateReourceDto): Promise<any> {
    const permission = await this.findOne(id)
    Object.assign(permission, data)
    return this.permissionRepository.save(permission)
  }

  async delete(id: number): Promise<any> {
    await this.findOne(id)
    await this.permissionRepository.delete({ id })
  }

  async deleteMany(ids: number[]): Promise<any> {
    await this.permissionRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<Permission>> {
    const { skip, order, take, where } = QueryHelper.buildQuery(permissionFields, query)
    const [result, totalItem] = await this.permissionRepository.findAndCount({
      where,
      order,
      skip,
      take
    })
    return QueryHelper.buildReponse(result, totalItem, query)
  }

  async findOne(id: number): Promise<any> {
    const permission = await this.permissionRepository.findOne({ where: { id } })
    if (!permission) throw new NotFoundException('Không tìm thấy permission')
    return permission
  }
}
