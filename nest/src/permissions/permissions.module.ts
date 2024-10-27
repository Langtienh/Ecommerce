import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'src/groups/entities/group.entity'
import { Role } from 'src/roles/entities/role.entity'
import { Permission } from './entities/permission.entity'
import { PermissionsController } from './permissions.controller'
import { PermissionsService } from './permissions.service'

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Group, Role])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
