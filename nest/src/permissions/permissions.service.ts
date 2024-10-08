import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

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

  findAll() {
    return this.permisstionRepo.find({ order: { id: 'ASC' } });
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
