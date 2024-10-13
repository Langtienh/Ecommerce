import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryHelper } from 'src/base/query-helper';
import { Group } from 'src/groups/entities/group.entity';
import { ILike, In, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { QueryPremissionDto } from './dto/query-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, permissionFields } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permisstionRepo: Repository<Permission>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
  ) {}

  private async isGroupExist(groupId: number) {
    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async create(createPermissionDto: CreatePermissionDto) {
    const group = await this.isGroupExist(createPermissionDto.groupId);
    const permission = this.permisstionRepo.create(createPermissionDto);
    permission.group = group;
    return this.permisstionRepo.save(permission);
  }

  async findAll(query: QueryPremissionDto) {
    const { page, limit, sort, method, name, apiPath, groupId, resourceId } =
      query;
    const skip = (page - 1) * limit;
    const order = QueryHelper.toOrder(sort, permissionFields);
    // result
    const [result, totalItem] = await this.permisstionRepo.findAndCount({
      order,
      skip,
      take: limit,
      where: {
        method: method ? In(method) : null,
        name: name ? ILike(`%${name}%`) : null,
        apiPath: apiPath ? ILike(`%${apiPath}%`) : null,
        group:
          groupId && resourceId
            ? {
                id: groupId ? In(groupId) : null,
                resourceId: resourceId ? In(resourceId) : null,
              }
            : null,
      },
      relations: { group: true },
    });
    const totalPage = Math.ceil(totalItem / limit);
    const meta = { page, limit, totalPage, totalItem };
    return { meta, result };
  }

  async findOne(id: number) {
    const permission = await this.permisstionRepo.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(id);
    if (updatePermissionDto.groupId) {
      const group = await this.isGroupExist(updatePermissionDto.groupId);
      permission.group = group;
    }
    Object.assign(permission, updatePermissionDto);
    return this.permisstionRepo.save(permission);
  }

  remove(id: number) {
    return this.permisstionRepo.softDelete(id);
  }
}
