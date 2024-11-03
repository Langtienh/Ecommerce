import { Group } from '@/groups/entities/group.entity'
import { Permission } from '@/permissions/entities/permission.entity'
import { Resource } from '@/resources/entities/resource.entity'
import { Role } from '@/roles/entities/role.entity'
import { User } from '@/users/entities/user.entity'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseService } from './database.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Resource, Group, Permission]), UsersModule],
  providers: [DatabaseService]
})
export class DatabaseModule {}
