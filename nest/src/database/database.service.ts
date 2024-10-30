import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Group } from 'src/groups/entities/group.entity'
import { Permission } from 'src/permissions/entities/permission.entity'
import { Resource } from 'src/resources/entities/resource.entity'
import { Role } from 'src/roles/entities/role.entity'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { groupInitialized } from './data/group.data'
import { permissionInitialized } from './data/permission.data'
import { resourcesInitialized } from './data/resources.data'
import { rolePermissions } from './data/role-permissions.data'
import { rolesInitialized } from './data/role.data'
import { usersInitialized } from './data/user.data'

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name)
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Resource) private resourceRepository: Repository<Resource>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    private userService: UsersService,
    private configService: ConfigService
  ) {}

  async initResources() {
    const countResources = await this.resourceRepository.count()
    if (countResources === 0) {
      const resources = this.resourceRepository.create(resourcesInitialized)
      await this.resourceRepository.save(resources)
      this.logger.log('Resource initialized')
    }
  }

  async initRole() {
    const countRoles = await this.roleRepository.count()
    if (countRoles === 0) {
      const role = this.roleRepository.create(rolesInitialized)
      await this.roleRepository.save(role)
      this.logger.log('Role initialized')
    }
  }

  async initUser() {
    const defaltPassword = this.configService.get<string>('DEFAULT_PASSWORD')
    const countUsers = await this.userRepository.count()
    if (countUsers === 0) {
      const userswithPassword = await Promise.all(
        usersInitialized.map(async (user) => {
          const hashedPassword = await this.userService.hashPassword(defaltPassword)
          return {
            ...user,
            password: hashedPassword
          }
        })
      )

      const users = this.userRepository.create(userswithPassword)
      await this.userRepository.save(users)
      this.logger.log('User initialized')
    }
  }

  async initPermissions() {
    const countPermissions = await this.permissionRepository.count()
    if (countPermissions === 0) {
      const permissions = this.permissionRepository.create(permissionInitialized)
      await this.permissionRepository.save(permissions)
      this.logger.log('Permission initialized')
    }
  }

  async initGroup() {
    const countGroups = await this.groupRepository.count()
    if (countGroups === 0) {
      const groups = this.groupRepository.create(groupInitialized)
      await this.groupRepository.save(groups)
      this.logger.log('Group initialized')
    }
  }

  async initRolePermissions() {
    const roles = await this.roleRepository.find({ relations: { permissions: true } })
    const isExistData = roles.some((role) => role.permissions.length > 0)
    if (!isExistData) {
      const permissions = await this.permissionRepository.find()
      const rolePermission = rolePermissions.map((rolePermission) => {
        const role = roles.find((role) => role.id === rolePermission.id)
        const permission = permissions.filter((permission) =>
          rolePermission.permissions.map((p) => p.id).includes(permission.id)
        )
        return {
          role,
          permissions: permission
        }
      })

      await Promise.all(
        rolePermission.map(async (rolePermission) => {
          await this.roleRepository.save({ ...rolePermission.role, permissions: rolePermission.permissions })
        })
      )
      this.logger.log('Role Permission initialized')
    }
  }

  async onModuleInit() {
    await this.initRole()
    await this.initUser()
    await this.initResources()
    await this.initGroup()
    await this.initPermissions()
    await this.initRolePermissions()
  }
}
