import { MailModule } from '@/mail/mail.module'
import { RolesModule } from '@/roles/roles.module'
import { UserModule } from '@/users/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Otp } from './entities/otp.entity'
import { Token } from './entities/token.entity'
import { JwtServiceCustom } from './jwt/jwt.service'
import { JwtStrategy } from './jwt/jwt.strategy'

@Module({
  imports: [
    UserModule,
    RolesModule,
    MailModule,
    TypeOrmModule.forFeature([Token, Otp]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES')
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtServiceCustom]
})
export class AuthModule {}
