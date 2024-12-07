import { PermissionModule } from '@/permission/permission.module'
import { ResourceModule } from '@/resource/resource.module'
import { RolesModule } from '@/roles/roles.module'
import { UserModule } from '@/users/user.module'
import { Module } from '@nestjs/common'
import { SheedsService } from './sheeds.service'

@Module({
  providers: [SheedsService],
  imports: [UserModule, RolesModule, PermissionModule, ResourceModule]
})
export class SheedsModule {}
