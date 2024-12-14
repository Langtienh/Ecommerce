import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailController } from './mail.controller'
import { MailService } from './mail.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configServices: ConfigService) => ({
        transport: {
          host: configServices.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: configServices.get('MAIL_USER'),
            pass: configServices.get('MAIL_PASS')
          }
        },
        preview: configServices.get('MAIL_PREVIEW') === 'true',
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),

      inject: [ConfigService]
    })
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
