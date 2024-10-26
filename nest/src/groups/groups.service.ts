import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryHelper } from 'src/base/query-helper'
import { Permission } from 'src/permissions/entities/permission.entity'
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
    private resourceService: ResourcesService,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    await this.resourceService.findOne(createGroupDto.resourceId)
    return this.groupRepo.save(createGroupDto)
  }

  async findAll(query: QueryGroupDto) {
    const { limit, page, sort, search, ...fileds } = query
    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0')
    }
    const skip = (page - 1) * limit
    const queryBuilder = this.groupRepo.createQueryBuilder('group')
    const order = QueryHelper.toOrder(sort, groupFields)
    if (limit > 0) queryBuilder.take(limit).skip(skip)
    queryBuilder.orderBy(order)

    const where = QueryHelper.toFilter(fileds, groupFields)
    if (search) {
      queryBuilder.andWhere({
        name: ILike(`%${search}%`)
      })
    }
    queryBuilder.andWhere(where)
    const [result, totalItem] = await queryBuilder.getManyAndCount()
    const totalPage = limit > 0 ? Math.ceil(totalItem / limit) : 1
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

  async remove(id: number) {
    const permissions = await this.permissionRepo.exists({ where: { groupId: id } })
    if (!permissions) return this.groupRepo.delete(id)
    return this.groupRepo.softDelete(id)
  }
}
