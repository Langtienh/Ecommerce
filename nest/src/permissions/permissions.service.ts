import { queryHelper } from '@/base/query-helper'
import { Group } from '@/groups/entities/group.entity'
import { Role } from '@/roles/entities/role.entity'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, In, Repository } from 'typeorm'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { QueryPremissionDto } from './dto/query-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { Permission } from './entities/permission.entity'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permisstionRepo: Repository<Permission>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  private async isGroupExist(groupId: number) {
    const group = await this.groupRepo.findOne({ where: { id: groupId } })
    if (!group) {
      throw new NotFoundException('Không tìm thấy nhóm quyền')
    }
    return group
  }

  async create(createPermissionDto: CreatePermissionDto) {
    const group = await this.isGroupExist(createPermissionDto.groupId)
    const permission = this.permisstionRepo.create(createPermissionDto)
    permission.group = group
    return this.permisstionRepo.save(permission)
  }

  async findAll(query: QueryPremissionDto) {
    const { limit, order, page, search, skip, take, where } = queryHelper.buildQuery(query, Permission)
    const [result, totalItem] = await this.permisstionRepo.findAndCount({
      order,
      skip,
      take,
      where: [
        { ...where, name: ILike(`%${search}%`) },
        { ...where, apiPath: ILike(`%${search}%`) }
      ],
      relations: { group: true }
    })
    const totalPage = limit > 0 ? Math.ceil(totalItem / limit) : 1
    const meta = { page, limit, totalPage, totalItem }
    return { meta, result }
  }

  async findOne(id: number) {
    const permission = await this.permisstionRepo.findOne({ where: { id }, relations: { group: true } })
    if (!permission) {
      throw new NotFoundException('Không tìm thấy quyền')
    }
    return permission
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(id)
    if (updatePermissionDto.groupId) {
      const group = await this.isGroupExist(updatePermissionDto.groupId)
      permission.group = group
    }
    Object.assign(permission, updatePermissionDto)
    return this.permisstionRepo.save(permission)
  }

  async remove(id: number) {
    const roleExist = await this.roleRepo.exists({ where: { permissions: { id } } })
    if (roleExist) {
      throw new ConflictException('Quyền đang được sử dụng')
    }
    return this.permisstionRepo.delete(id)
  }

  async removeMany(ids: number[]) {
    const roleExist = await this.roleRepo.exists({ where: { permissions: { id: In(ids) } } })
    if (roleExist) {
      throw new ConflictException('Quyền đang được sử dụng')
    }
    return this.permisstionRepo.delete(ids)
  }
}
