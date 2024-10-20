import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'src/groups/entities/group.entity'
import { Permission } from 'src/permissions/entities/permission.entity'
import { Resource } from 'src/resources/entities/resource.entity'
import { Role } from 'src/roles/entities/role.entity'
import { User } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module'
import { DatabaseService } from './database.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Resource, Group, Permission]), UsersModule],
  providers: [DatabaseService]
})
export class DatabaseModule {}
