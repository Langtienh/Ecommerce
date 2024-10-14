import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailModule } from 'src/mail/mail.module'
import { User } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'
import { Token } from './entities/token.entity'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([User, Token]),
    UsersModule,
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
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy]
})
export class AuthenticationModule {}
