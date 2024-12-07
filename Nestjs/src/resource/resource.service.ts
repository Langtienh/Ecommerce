import { ICrudServices } from '@/core/crud'
import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
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
    @InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>
  ) {}

  async checkExistName(name?: string): Promise<boolean> {
    if (!name) return false
    return this.resourceRepository.existsBy({ name })
  }

  async create(data: CreateResourceDto): Promise<any> {
    const isExist = await this.checkExistName(data.name)
    if (isExist) throw new ConflictException('Tên resource đã tồn tại')
    const resource = await this.resourceRepository.create(data)
    return this.resourceRepository.save(resource)
  }

  async createMany(data: CreateResourceDto[]): Promise<any> {
    return this.resourceRepository.save(data)
  }

  async initializeData(data: CreateResourceDto[]) {
    const count = await this.resourceRepository.count()
    if (count > 0) return
    await this.resourceRepository.save(
      data.map((resource) => ({ ...resource, creatorId: 2, updaterId: 2 }))
    )
    this.logger.log('Resources Initialized')
  }

  async update(id: number, data: UpdateReourceDto): Promise<any> {
    const isExist = await this.checkExistName(data.name)
    if (isExist) throw new ConflictException('Tên resource đã tồn tại')
    const resource = await this.findOne(id)
    Object.assign(resource, data)
    return this.resourceRepository.save(resource)
  }

  async delete(id: number): Promise<any> {
    await this.findOne(id)
    await this.resourceRepository.delete({ id })
  }

  async deleteMany(ids: number[]): Promise<any> {
    await this.resourceRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<Resource>> {
    const { skip, order, take, where } = QueryHelper.buildQuery(resourceFields, query)
    const [result, totalItem] = await this.resourceRepository.findAndCount({
      where,
      order,
      skip,
      take
    })
    return QueryHelper.buildReponse(result, totalItem, query)
  }

  async findOne(id: number): Promise<any> {
    const resource = await this.resourceRepository.findOne({ where: { id } })
    if (!resource) throw new NotFoundException('Không tìm thấy resource')
    return resource
  }
}
