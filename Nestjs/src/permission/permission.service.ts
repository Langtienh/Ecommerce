import { ICrudServices } from '@/core/crud'
import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdateReourceDto } from './dto/update-permission.dto'
import { Permission, permissionFields } from './entities/permission.entity'

@Injectable()
export class PermissionService implements ICrudServices {
  private readonly logger = new Logger(PermissionService.name)
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
  ) {}
  async create(data: CreatePermissionDto) {
    return this.permissionRepository.save(data)
  }

  async initializeData(data: CreatePermissionDto[]) {
    const count = await this.permissionRepository.count()
    if (count > 0) return
    await this.permissionRepository.save(
      data.map((permission) => ({
        ...permission,
        creatorId: 2,
        updaterId: 2,
        name: `${permission.name}:${permission.group}`
      }))
    )
    this.logger.log('Permissions Initialized')
  }

  async update(id: number, data: UpdateReourceDto) {
    const permission = await this.findOne(id)
    Object.assign(permission, data)
    return this.permissionRepository.save(permission)
  }

  async delete(id: number) {
    await this.findOne(id)
    await this.permissionRepository.delete({ id })
  }

  async deleteMany(ids: number[]) {
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

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({ where: { id } })
    if (!permission) throw new NotFoundException('Không tìm thấy permission')
    return permission
  }
}
