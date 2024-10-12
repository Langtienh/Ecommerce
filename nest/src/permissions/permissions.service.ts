import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryHelper } from 'src/base/query-helper';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';
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
    const { page, limit, sort, search, method, ...fields } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.permisstionRepo.createQueryBuilder('permission');
    queryBuilder.skip(skip).take(limit);

    if (search) {
      queryBuilder.andWhere(
        'permission.name ILIKE :search or permission.apiPath ILike :search',
        {
          search: `%${search}%`,
        },
      );
    }
    // default
    const order = QueryHelper.toOrder(sort, permissionFields);
    const where = QueryHelper.toFilter(fields, permissionFields);
    queryBuilder.andWhere(where);
    queryBuilder.orderBy(order);
    // custom
    if (method) {
      queryBuilder.andWhere({ method });
    }
    // result
    const [result, totalItem] = await queryBuilder.getManyAndCount();
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
