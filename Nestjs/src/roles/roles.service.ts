import { PaginationResponse } from '@/lib/pagination/pagination.interface'
import { QueryBase, QueryHelper } from '@/lib/query-helper'
import { PermissionService } from '@/permission/permission.service'
import { UserService } from '@/users/user.service'
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { IRolesService } from './abstract'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { Role, roleFields } from './entities/role.entity'

// todo: xử lý roleLevel
@Injectable()
export class RolesService implements IRolesService {
  private readonly logger = new Logger(RolesService.name)
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @Inject(forwardRef(() => PermissionService))
    private readonly permissionService: PermissionService,
    private readonly userSercice: UserService
  ) {}
  async checkExistRoleByName(name?: string): Promise<boolean> {
    if (!name) return false
    return this.roleRepository.existsBy({ name })
  }

  async create(data: CreateRoleDto) {
    const isExist = await this.checkExistRoleByName(data.name)
    if (isExist) throw new ConflictException('Tên role đã tồn tại')
    const permissionPaginate = await this.permissionService.findMany({
      filter: { id: { in: data.permissionIds.toString() } }
    })
    const role = this.roleRepository.create(data)
    role.permissions = permissionPaginate.result
    return this.roleRepository.save(role)
  }

  async initializeData(data: CreateRoleDto[]) {
    const count = await this.roleRepository.count()
    if (count > 0) return
    await this.roleRepository.save(
      data.map((role) => ({
        ...role,
        permissionIds: []
      }))
    )
    this.logger.log('Roles Initialized')
  }

  async initializeRolePermissions(data: { roleId: number; permissionIds: number[] }[]) {
    const allRoles = await this.roleRepository.find({ relations: { permissions: true } })
    const countRolePermisions = allRoles.reduce((acc, role) => acc + role.permissions.length, 0)
    if (countRolePermisions > 0) return
    const addRolePermission = async (roleId: number, permissionIds: number[]) => {
      const role = await this.findOne(roleId)
      const permissionPaginate = await this.permissionService.findMany({
        filter: { id: { in: permissionIds.toString() } }
      })
      role.permissions = permissionPaginate.result
      return this.roleRepository.save(role)
    }
    await Promise.all(data.map((item) => addRolePermission(item.roleId, item.permissionIds)))
    this.logger.log('Role Permissions Initialized')
    return true
  }

  async update(id: number, data: UpdateRoleDto) {
    const isExist = await this.checkExistRoleByName(data.name)
    if (isExist) throw new ConflictException('Tên role đã tồn tại')
    const role = await this.findOne(id)
    const permissionPaginate = await this.permissionService.findMany({
      filter: { id: { in: data.permissionIds.toString() } }
    })
    Object.assign(role, data)
    role.permissions = permissionPaginate.result
    return this.roleRepository.save(role)
  }

  async delete(id: number) {
    const role = await this.findOne(id)
    const userPaginate = await this.userSercice.findMany({ filter: { roleId: ` ${id}` } })
    if (userPaginate.meta.totalItem > 0)
      throw new ConflictException(`Không thể xóa, role ${role.name} đang được sử dụng`)
    await this.roleRepository.delete({ id })
  }

  async deleteMany(ids: number[]) {
    const userPaginate = await this.userSercice.findMany({
      filter: { roleId: { in: ids.toString() } }
    })
    if (userPaginate.meta.totalItem > 0)
      throw new ConflictException('Không thể xóa, role đang được sử dụng')
    await this.roleRepository.delete({ id: In(ids) })
  }

  async findMany(query: QueryBase): Promise<PaginationResponse<Role>> {
    const { skip, order, take, where } = QueryHelper.buildQuery(roleFields, query)
    const [result, totalItem] = await this.roleRepository.findAndCount({
      where,
      order,
      skip,
      take
    })
    return QueryHelper.buildReponse(result, totalItem, query)
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: { permissions: true }
    })
    if (!role) throw new NotFoundException('Role not found')
    return role
  }

  async existsByPermissionIds(permissionIds: number[]) {
    const count = await this.roleRepository.count({
      where: { permissions: { id: In(permissionIds) } }
    })
    return count > 0
  }
}
