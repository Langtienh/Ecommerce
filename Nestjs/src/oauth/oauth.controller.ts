import { Public } from '@/decorator/customize'
import { Controller, Get, Query, Response } from '@nestjs/common'
import * as express from 'express'
import { OauthService } from './oauth.service'

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}
  @Public()
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

  @Public()
  @Get('github')
  getGithubOauthUrl() {
    return this.oauthService.getOauthGithubUrl()
  }

  @Public()
  @Get('github/callback')
  async githubCallback(@Query('code') code: string, @Response() res: express.Response) {
    const url = await this.oauthService.loginWithGithub(code)
    res.redirect(url)
  }
}
