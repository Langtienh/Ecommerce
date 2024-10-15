import { Controller, Get, Query, Response } from '@nestjs/common'
import * as express from 'express'
import { Public, ReponseMessage } from 'src/decorator/customize'
import { OauthService } from './oauth.service'

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}
  @Public()
  @ReponseMessage('Get google oauth url successfully')
  @Get('google')
  getGoogleOauthUrl() {
    return this.oauthService.getOauthGoogleUrl()
  }

  @Public()
  @Get('google/callback')
  async googleCallback(@Query('code') code: string, @Response() res: express.Response) {
    const url = await this.oauthService.loginWithGoogle(code)
    res.redirect(url)
  }
}
