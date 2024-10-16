import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public, ReponseMessage } from 'src/decorator/customize'
import { OTP_TYPE } from './constants'
import { MailService } from './mail.service'

@ApiTags('test send email')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Get()
  @ReponseMessage('Mail sent successfully')
  sendMail() {
    return this.mailService.sendWithOtp('1234', 'langtienk4@gmail.com', OTP_TYPE.verifyEmail)
  }
}
