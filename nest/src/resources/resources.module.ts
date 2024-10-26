import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'src/groups/entities/group.entity'
import { Resource } from './entities/resource.entity'
import { ResourcesController } from './resources.controller'
import { ResourcesService } from './resources.service'

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Group])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService]
})
export class ResourcesModule {}
