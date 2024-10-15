import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOption } from 'db/data-source'
import { AuthenticationModule } from './authentication/authentication.module'
import { GroupsModule } from './groups/groups.module'
import { MailModule } from './mail/mail.module'
import { PermissionsModule } from './permissions/permissions.module'
import { ResourcesModule } from './resources/resources.module'
import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(dataSourceOption),
    UsersModule,
    JwtModule,
    ResourcesModule,
    GroupsModule,
    RolesModule,
    PermissionsModule,
    AuthenticationModule,
    MailModule,
    OauthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
