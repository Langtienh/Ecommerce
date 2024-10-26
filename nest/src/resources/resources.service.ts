import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryHelper } from 'src/base/query-helper'
import { Group } from 'src/groups/entities/group.entity'
import { In, Repository } from 'typeorm'
import { CreateResourceDto } from './dto/create-resource.dto'
import { QueryResourceDto } from './dto/query-resource.dto'
import { UpdateResourceDto } from './dto/update-resource.dto'
import { Resource, ResourceFields } from './entities/resource.entity'

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
    const { limit, page, sort, search, ...fileds } = query
    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0')
    }
    const queryBuilder = this.resourceRepo.createQueryBuilder('resource')
    const skip = (page - 1) * limit
    const order = QueryHelper.toOrder(sort, ResourceFields)
    if (limit > 0) queryBuilder.take(limit).skip(skip)
    queryBuilder.orderBy(order)
    const where = QueryHelper.toFilter(fileds, ResourceFields)
    queryBuilder.andWhere(where)

    if (search) {
      queryBuilder.andWhere('resource.name ILIKE :search', {
        search: `%${search}%`
      })
    }
    const [result, totalItem] = await queryBuilder.getManyAndCount()
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
    return this.resourceRepo.softDelete(id)
  }

  async removeMany(ids: number[]) {
    const groups = await this.groupRepo.find({ where: { resourceId: In(ids) } })
    if (!groups.length) return this.resourceRepo.delete(ids)
    else throw new ConflictException('Resource đang được sử dụng')
  }
}
