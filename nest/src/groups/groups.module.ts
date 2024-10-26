import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from 'src/permissions/entities/permission.entity'
import { Resource } from 'src/resources/entities/resource.entity'
import { ResourcesService } from 'src/resources/resources.service'
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
