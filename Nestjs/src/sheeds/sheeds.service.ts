import { PermissionService } from '@/permission/permission.service'
import { ResourceService } from '@/resource/resource.service'
import { RolesService } from '@/roles/roles.service'
import { UserService } from '@/users/user.service'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  permissionInitialized,
  resourcesInitialized,
  rolePermissionIds,
  rolesInitialized,
  usersInitialized
} from './data'

@Injectable()
export class SheedsService implements OnModuleInit {
  private readonly logger = new Logger(SheedsService.name)
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly resourceService: ResourceService,
    private readonly permissionService: PermissionService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    await this.roleService.initializeData(
      rolesInitialized.map((role) => ({ ...role, permissionIds: [] }))
    )
    const password = await this.configService.get('DEFAULT_PASSWORD')
    await this.userService.initializeData(usersInitialized.map((user) => ({ ...user, password })))
    await this.resourceService.initializeData(resourcesInitialized)
    await this.permissionService.initializeData(permissionInitialized)
    await this.roleService.initializeRolePermissions(rolePermissionIds)
  }
}
