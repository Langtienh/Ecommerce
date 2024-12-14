import { Public, ResponseMessage } from '@/decorator/customize'
import { Controller, Get } from '@nestjs/common'
import { OTP_TYPE } from './mail.config'
import { MailService } from './mail.service'

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Public()
  @Get()
  @ResponseMessage('Mail sent successfully')
  sendMail() {
    return this.mailService.sendWithOtp('1234', 'langtienk4@gmail.com', OTP_TYPE.verifyEmail)
  }
}
