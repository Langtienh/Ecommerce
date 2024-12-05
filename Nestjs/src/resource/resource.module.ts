import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Resource } from './entities/resource.entity'
import { ResourceController } from './resource.controller'
import { ResourceService } from './resource.service'

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourceController],
  providers: [ResourceService]
})
export class ResourceModule {}
