import { Permission } from '@/permissions/entities/permission.entity'
import { Resource } from '@/resources/entities/resource.entity'
import { ResourcesService } from '@/resources/resources.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from './entities/group.entity'
import { GroupsController } from './groups.controller'
import { GroupsService } from './groups.service'

@Module({
  imports: [TypeOrmModule.forFeature([Group, Resource, Permission])],
  controllers: [GroupsController],
  providers: [GroupsService, ResourcesService],
  exports: [GroupsService]
})
export class GroupsModule {}
