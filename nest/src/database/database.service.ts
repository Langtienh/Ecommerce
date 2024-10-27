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
import { permissionInitialized } from './data/permission.data'
import { resourcesInitialized } from './data/resources.data'
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
    const countUsers = await this.userRepository.count()
    if (countUsers === 0) {
      const userswithPassword = await Promise.all(
        usersInitialized.map(async (user) => {
          const hashedPassword = await this.userService.hashPassword(user.password)
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

  async onModuleInit() {
    await this.initRole()
    await this.initUser()
    await this.initResources()
    await this.initPermissions()
  }
}
