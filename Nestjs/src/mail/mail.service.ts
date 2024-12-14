import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OTP_MESSAGE, OTP_TYPE } from './mail.config'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWithOtp(otp: string, mail: string, otpType: OTP_TYPE) {
    await this.mailerService.sendMail({
      to: mail,
      from: '"Ecommerce" <ecommerce@example.com>',
      subject: OTP_MESSAGE[otpType].subject,
      template: 'otp',
      context: {
        otp,
        description: OTP_MESSAGE[otpType].description
      }
    })
  }
}
