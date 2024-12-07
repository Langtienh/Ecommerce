import { queryHelper } from '@/base/query-helper'
import { Group } from '@/groups/entities/group.entity'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, In, Repository } from 'typeorm'
import { CreateResourceDto } from './dto/create-resource.dto'
import { QueryResourceDto } from './dto/query-resource.dto'
import { UpdateResourceDto } from './dto/update-resource.dto'
import { Resource } from './entities/resource.entity'

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource) private resourceRepo: Repository<Resource>,
    @InjectRepository(Group) private groupRepo: Repository<Group>
  ) {}

  async isResourceNameExist(name: string) {
    const resource = await this.resourceRepo.findOne({ where: { name }, withDeleted: true })
    if (resource) {
      throw new ConflictException('Resource already exists')
    }
    return resource
  }

  async create(createResourceDto: CreateResourceDto, creatorId: number) {
    await this.isResourceNameExist(createResourceDto.name)
    return this.resourceRepo.save({
      ...createResourceDto,
      creatorId,
      updaterId: creatorId
    })
  }

  async findAll(query: QueryResourceDto) {
    const { page, limit, search, order, where, skip, take } = queryHelper.buildQuery(query, Resource)
    const [result, totalItem] = await this.resourceRepo.findAndCount({
      where: [
        {
          ...where,
          name: search ? ILike(`%${search}%`) : undefined
        },
        { ...where, description: search ? ILike(`%${search}%`) : undefined }
      ],
      take,
      skip,
      order: Object.keys(order).length ? order : { id: 'ASC' }
    })
    const totalPage = limit > 0 ? Math.ceil(totalItem / limit) : 1
    const meta = { totalItem, totalPage, page, limit }
    return { meta, result }
  }

  async findOne(id: number) {
    const resource = await this.resourceRepo.findOne({ where: { id } })
    if (!resource) {
      throw new NotFoundException('Resource not found')
    }
    return resource
  }

  async update(id: number, updateResourceDto: UpdateResourceDto, updatorId: number) {
    const { name } = updateResourceDto
    const resource = await this.resourceRepo.findOne({ where: { id } })
    if (!resource) {
      throw new NotFoundException('Resource not found')
    }
    if (name && resource.name !== name) this.isResourceNameExist(name)
    Object.assign(resource, {
      ...updateResourceDto,
      updatorId,
      creatorId: updatorId
    })
    return this.resourceRepo.save(resource)
  }

  async remove(id: number) {
    const group = await this.groupRepo.exists({ where: { resourceId: id } })
    if (!group) return this.resourceRepo.delete(id)
    else throw new ConflictException('Resource đang được sử dụng')
  }

  async removeMany(ids: number[]) {
    const groups = await this.groupRepo.find({ where: { resourceId: In(ids) } })
    if (!groups.length) return this.resourceRepo.delete(ids)
    else throw new ConflictException('Resource đang được sử dụng')
  }

  async getAllPermissions(resourceId: number, query: QueryResourceDto) {
    const { limit, page } = queryHelper.buildQuery(query, Resource)
    const [result, totalItem] = await this.resourceRepo.findAndCount({
      where: {
        id: resourceId > 0 ? resourceId : undefined
      },
      relations: {
        groups: {
          permissions: true
        }
      },
      take: limit > 0 ? limit : undefined,
      skip: limit > 0 ? (page - 1) * limit : undefined,
      order: { id: 'ASC' }
    })
    const totalPage = limit > 0 ? Math.ceil(totalItem / limit) : 1
    const meta = { totalItem, totalPage, page, limit }
    return { meta, result }
  }
}
