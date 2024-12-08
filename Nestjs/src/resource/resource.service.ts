import { ICrudServices } from '@/core/crud'
import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
import { PermissionService } from '@/permission/permission.service'
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateResourceDto } from './dto/create-resource.dto'
import { UpdateReourceDto } from './dto/update-resource.dto'
import { Resource, resourceFields } from './entities/resource.entity'

@Injectable()
export class ResourceService implements ICrudServices {
  private readonly logger = new Logger(ResourceService.name)
  constructor(
    private readonly permissionService: PermissionService,
    @InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>
  ) {}

  async checkExistName(name?: string): Promise<boolean> {
    if (!name) return false
    return this.resourceRepository.existsBy({ name })
  }

  async create(data: CreateResourceDto) {
    const isExist = await this.checkExistName(data.name)
    if (isExist) throw new ConflictException('Tên resource đã tồn tại')
    const resource = await this.resourceRepository.create(data)
    return this.resourceRepository.save(resource)
  }

  async createMany(data: CreateResourceDto[]) {
    return this.resourceRepository.save(data)
  }

  async initializeData(data: CreateResourceDto[]) {
    const isExist = await this.resourceRepository.exists()
    if (isExist) return
    await this.resourceRepository.save(
      data.map((resource) => ({ ...resource, creatorId: 2, updaterId: 2 }))
    )
    this.logger.log('Resources Initialized')
  }

  async update(id: number, data: UpdateReourceDto) {
    const isExist = await this.checkExistName(data.name)
    if (isExist) throw new ConflictException('Tên resource đã tồn tại')
    const resource = await this.findOne(id)
    Object.assign(resource, data)
    return this.resourceRepository.save(resource)
  }

  async delete(id: number) {
    const resource = await this.findOne(id)
    const countPermission = await this.permissionService.count({ resourceId: id })
    if (countPermission > 0)
      throw new ConflictException(
        `Không thể xóa, ${resource.name} resource đang được ${countPermission} permission sử dụng`
      )
    await this.resourceRepository.delete({ id })
  }

  async deleteMany(ids: number[]) {
    const resourcesCount = await this.resourceRepository.countBy({ id: In(ids) })
    if (resourcesCount !== ids.length) throw new NotFoundException('Một số resource không tồn tại')
    const countPermission = await this.permissionService.count({ resourceId: In(ids) })
    if (countPermission > 0)
      throw new ConflictException(
        `Không thể xóa, các resource đã chọn đang được ${countPermission} permission sử dụng`
      )
    await this.resourceRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<Resource>> {
    const { skip, order, take, where } = QueryHelper.buildQuery<Resource>(resourceFields, query, [
      'name',
      'description'
    ])
    const [result, totalItem] = await this.resourceRepository.findAndCount({
      where,
      order,
      skip,
      take
    })
    return QueryHelper.buildReponse(result, totalItem, query)
  }

  async findOne(id: number) {
    const resource = await this.resourceRepository.findOne({ where: { id } })
    if (!resource) throw new NotFoundException('Không tìm thấy resource')
    return resource
  }
}
