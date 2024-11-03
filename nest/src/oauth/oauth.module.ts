import { AuthenticationModule } from '@/authentication/authentication.module'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { OauthController } from './oauth.controller'
import { OauthService } from './oauth.service'

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [OauthController],
  providers: [OauthService]
})
export class OauthModule {}
