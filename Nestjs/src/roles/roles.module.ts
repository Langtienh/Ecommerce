import { PermissionModule } from '@/permission/permission.module'
import { UserModule } from '@/users/user.module'
import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => PermissionModule), UserModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
