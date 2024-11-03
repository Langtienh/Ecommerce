import { Group } from '@/groups/entities/group.entity'
import { Role } from '@/roles/entities/role.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from './entities/permission.entity'
import { PermissionsController } from './permissions.controller'
import { PermissionsService } from './permissions.service'

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Group, Role])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
