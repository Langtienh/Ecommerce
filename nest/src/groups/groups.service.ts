import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryHelper } from 'src/base/query-helper'
import { ResourcesService } from 'src/resources/resources.service'
import { ILike, Repository } from 'typeorm'
import { CreateGroupDto } from './dto/create-group.dto'
import { QueryGroupDto } from './dto/query-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { Group, groupFields } from './entities/group.entity'

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    private resourceService: ResourcesService
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    await this.resourceService.findOne(createGroupDto.resourceId)
    return this.groupRepo.save(createGroupDto)
  }

  async findAll(query: QueryGroupDto) {
    const { limit, page, sort, search, ...fileds } = query
    const skip = (page - 1) * limit
    const queryBuilder = this.groupRepo.createQueryBuilder('group')
    const order = QueryHelper.toOrder(sort, groupFields)
    queryBuilder.skip(skip).take(limit).orderBy(order)

    const where = QueryHelper.toFilter(fileds, groupFields)
    if (search) {
      queryBuilder.andWhere({
        name: ILike(`%${search}%`)
      })
    }
    queryBuilder.andWhere(where)
    const [result, totalItem] = await queryBuilder.getManyAndCount()
    const totalPage = Math.ceil(totalItem / limit)
    const meta = { page, limit, totalPage, totalItem }
    return { meta, result }
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOne({
      select: ['id', 'name', 'permissions'],
      relations: { resource: true, permissions: true },
      where: { id }
    })
    if (!group) {
      throw new NotFoundException('Group not found')
    }
    return group
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id)
    Object.assign(group, updateGroupDto)
    return this.groupRepo.save(group)
  }

  remove(id: number) {
    return this.groupRepo.softDelete(id)
  }
}
