import { PermissionModule } from '@/permission/permission.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Resource } from './entities/resource.entity'
import { ResourceController } from './resource.controller'
import { ResourceService } from './resource.service'

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), PermissionModule],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService]
})
export class ResourceModule {}
