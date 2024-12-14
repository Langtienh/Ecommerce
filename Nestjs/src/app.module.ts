import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { MeModule } from './me/me.module'
import { OauthModule } from './oauth/oauth.module'
import { PermissionModule } from './permission/permission.module'
import { ResourceModule } from './resource/resource.module'
import { RolesModule } from './roles/roles.module'
import { SheedsModule } from './sheeds/sheeds.module'
import { UserModule } from './users/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.local`, // Sử dụng file biến môi trường tương ứng với NODE_ENV
        '.env' // Sử dụng file .env nếu không tìm thấy file tương ứng với NODE_ENV
      ]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/db/migrations/*.js'],
        synchronize: true,
        ssl: configService.get('DB_SSL') === 'true'
      }),
      inject: [ConfigService]
    }),
    UserModule,
    RolesModule,
    ResourceModule,
    PermissionModule,
    SheedsModule,
    AuthModule,
    MailModule,
    OauthModule,
    MeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
