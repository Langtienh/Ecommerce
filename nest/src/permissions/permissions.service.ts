import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryHelper } from 'src/base/query-helper'
import { Group } from 'src/groups/entities/group.entity'
import { Role } from 'src/roles/entities/role.entity'
import { ILike, In, Repository } from 'typeorm'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { QueryPremissionDto } from './dto/query-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { Permission, permissionFields } from './entities/permission.entity'

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
    const { page, limit, sort, method, apiPath, groupId, resourceId, search, status } = query
    if (page < 1) {
      throw new BadRequestException('Trang phải lớn hơn 0')
    }
    const skip = (page - 1) * limit
    const order = QueryHelper.toOrder(sort, permissionFields)
    // result
    const [result, totalItem] = await this.permisstionRepo.findAndCount({
      order,
      skip: limit > 0 ? skip : 0,
      take: limit > 0 ? limit : undefined,
      where: {
        method: method ? In(method) : undefined,
        name: search ? ILike(`%${search}%`) : undefined,
        apiPath: apiPath ? ILike(`%${apiPath}%`) : undefined,
        isActive: status ? In(status.map((item) => item === 'true')) : undefined,
        group:
          groupId && resourceId
            ? {
                id: groupId ? In(groupId) : undefined,
                resourceId: resourceId ? In(resourceId) : undefined
              }
            : undefined
      },
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
      throw new BadRequestException('Quyền đang được sử dụng')
    }
    return this.permisstionRepo.delete(id)
  }

  async removeMany(ids: number[]) {
    const roleExist = await this.roleRepo.exists({ where: { permissions: { id: In(ids) } } })
    if (roleExist) {
      throw new BadRequestException('Quyền đang được sử dụng')
    }
    return this.permisstionRepo.delete(ids)
  }
}
