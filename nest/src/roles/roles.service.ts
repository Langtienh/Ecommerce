import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async isExistName(name: string, roleId?: number) {
    const role = await this.roleRepo.findOne({ where: { name } });
    if (role && role.id !== roleId) {
      throw new ConflictException('Role already exists');
    }
    return role;
  }

  async create(createRoleDto: CreateRoleDto) {
    const { name, permissionIds } = createRoleDto;
    await this.isExistName(name);
    const permissions = await this.permissionRepo.findByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw new NotFoundException('Some permission not found');
    }
    const role = this.roleRepo.create(createRoleDto);
    role.permissions = permissions;
    return this.roleRepo.save(role);
  }

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissionIds } = updateRoleDto;
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    if (updateRoleDto.name) await this.isExistName(updateRoleDto.name, id);
    Object.assign(role, updateRoleDto);
    if (permissionIds) {
      const permissions = await this.permissionRepo.findByIds(permissionIds);
      if (permissions.length !== permissionIds.length) {
        throw new NotFoundException('Some permission not found');
      }
      role.permissions = permissions;
    }
    return this.roleRepo.save(role);
  }

  async remove(id: number) {
    // todo: remove role if not used has role

    // soft delete
    const result = await this.roleRepo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Role not found');
    }
  }
}
