import { ICrudServices } from '@/core/crud'
import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
import { RolesService } from '@/roles/roles.service'
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdateReourceDto } from './dto/update-permission.dto'
import { Permission, permissionFields } from './entities/permission.entity'

@Injectable()
export class PermissionService implements ICrudServices {
  private readonly logger = new Logger(PermissionService.name)
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    @Inject(forwardRef(() => RolesService)) private readonly roleService: RolesService
  ) {}

  find(options?: FindManyOptions<Permission>) {
    return this.permissionRepository.find(options)
  }

  count(where?: FindOptionsWhere<Permission> | FindOptionsWhere<Permission>[]) {
    if (!where) return this.permissionRepository.count()
    return this.permissionRepository.countBy(where)
  }

  findAndCount(options?: FindManyOptions<Permission>) {
    return this.permissionRepository.findAndCount(options)
  }

  async existsBy(options: FindManyOptions<Permission>) {
    return this.permissionRepository.count(options)
  }

  async create(data: CreatePermissionDto) {
    return this.permissionRepository.save(data)
  }

  async initializeData(data: CreatePermissionDto[]) {
    const isExist = await this.permissionRepository.exists()
    if (isExist) return
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
    const permission = await this.findOne(id)
    const isExistsByPermissionIds = await this.roleService.existsBy({ permissions: { id } })
    if (isExistsByPermissionIds)
      throw new ConflictException(`Permission ${permission.name} đang được sử dụng`)
    await this.permissionRepository.delete({ id })
  }

  async deleteMany(ids: number[]) {
    const isExistsByPermissionIds = await this.roleService.existsBy({
      permissions: { id: In(ids) }
    })
    if (isExistsByPermissionIds)
      throw new ConflictException('Có một vài permission đang được sử dụng')
    await this.permissionRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<Permission>> {
    const { skip, order, take, where } = QueryHelper.buildQuery<Permission>(
      permissionFields,
      query,
      ['name', 'apiPath']
    )
    const [result, totalItem] = await this.permissionRepository.findAndCount({
      where,
      order,
      skip,
      take,
      relations: { updater: true, creator: true, resource: true }
    })
    return QueryHelper.buildResponse(result, totalItem, query)
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: { resource: true }
    })
    if (!permission) throw new NotFoundException('Không tìm thấy permission')
    return permission
  }
}
