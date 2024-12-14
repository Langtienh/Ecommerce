import { AuthModule } from '@/auth/auth.module'
import { UserModule } from '@/users/user.module'
import { Module } from '@nestjs/common'
import { OauthController } from './oauth.controller'
import { OauthService } from './oauth.service'

@Module({
  imports: [UserModule, AuthModule],
  controllers: [OauthController],
  providers: [OauthService]
})
export class OauthModule {}
