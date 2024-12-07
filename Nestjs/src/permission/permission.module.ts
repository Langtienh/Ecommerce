import { RolesModule } from '@/roles/roles.module'
import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from './entities/permission.entity'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), forwardRef(() => RolesModule)],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule {}
