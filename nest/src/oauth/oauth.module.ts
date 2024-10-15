import { Module } from '@nestjs/common'
import { AuthenticationModule } from 'src/authentication/authentication.module'
import { UsersModule } from 'src/users/users.module'
import { OauthController } from './oauth.controller'
import { OauthService } from './oauth.service'

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [OauthController],
  providers: [OauthService]
})
export class OauthModule {}
