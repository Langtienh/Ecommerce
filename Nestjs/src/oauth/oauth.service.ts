import { JwtServiceCustom } from '@/auth/jwt/jwt.service'
import { UserStatus } from '@/users/entities/user.entity'
import { UserService } from '@/users/user.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OauthGithubGetTokenResponse, OauthGithubUser, OauthGoogleUser } from './oauth.type'

@Injectable()
export class OauthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtServiceCustom
  ) {}

  private getGoogleConfigData() {
    const SERVER_HOST = this.configService.get('SERVER_HOST')
    const client_id = this.configService.get('GOOGLE_CLIENT_ID')
    const client_secret = this.configService.get('GOOGLE_CLIENT_SECRET')
    const redirect_uri = `${SERVER_HOST}/api/v1/oauth/google/callback`
    return { client_id, client_secret, redirect_uri }
  }

  getOauthGoogleUrl() {
    const { client_id, redirect_uri } = this.getGoogleConfigData()
    const options = {
      redirect_uri,
      client_id,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' ')
    }
    const qs = new URLSearchParams(options)
    return {
      redirectUri: `${'https://accounts.google.com/o/oauth2/v2/auth'}?${qs.toString()}`
    }
  }

  async getOauthGooleToken(code: string) {
    const { client_id, redirect_uri, client_secret } = this.getGoogleConfigData()

    // Phải sử dụng URLSearchParams để chuyển object thành query string vì sử dụng content-type application/x-www-form-urlencoded (quy tắc của OAuth2)
    const body = new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code'
    }).toString()
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const data = await res.json()
    return data
  }

  async getGoogleUser(code: string) {
    const { id_token, access_token } = await this.getOauthGooleToken(code)
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}&alt=json`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`
        }
      }
    )
    const data: OauthGoogleUser = await res.json()
    return data
  }

  async checkGoogleUser(data: OauthGoogleUser) {
    const user = await this.userService.findOneBy({ email: data.email })
    if (!user) {
      const newUser = await this.userService.create({
        email: data.email,
        name: data.name,
        avatar: data.picture,
        password: data.id,
        status: UserStatus.VERIFY
      })
      const { accessToken, refreshToken } =
        await this.jwtService.generateAccessRefreshToken(newUser)
      return { accessToken, refreshToken, isNew: true }
    }
    const { accessToken, refreshToken } = await this.jwtService.generateAccessRefreshToken(user)
    return { accessToken, refreshToken, isNew: false }
  }

  async loginWithGoogle(code: string) {
    const data = await this.getGoogleUser(code)
    const { accessToken, isNew, refreshToken } = await this.checkGoogleUser(data)
    const frontendUrl = this.configService.get<string>('FRONTEND_HOST')
    const url = `${frontendUrl}/api/oauth?accessToken=${accessToken}&refreshToken=${refreshToken}&isNew=${isNew}`
    return url
  }

  private getGithubConfigData() {
    const SERVER_HOST = this.configService.get('SERVER_HOST')
    const client_id = this.configService.get('GITHUB_CLIENT_ID')
    const client_secret = this.configService.get('GITHUB_CLIENT_SECRET')
    const redirect_uri = `${SERVER_HOST}/api/v1/oauth/github/callback`
    return { client_id, client_secret, redirect_uri }
  }

  getOauthGithubUrl() {
    const rootUrl = 'https://github.com/login/oauth/authorize'
    const { client_id, redirect_uri } = this.getGithubConfigData()
    const options = {
      redirect_uri,
      client_id,
      scope: 'user:email',
      prompt: 'select_account'
    }
    const qs = new URLSearchParams(options)
    return {
      redirectUri: `${rootUrl}?${qs.toString()}`
    }
  }

  async getGithubToken(code: string) {
    const rootUrl = 'https://github.com/login/oauth/access_token'
    const { client_id, client_secret } = this.getGithubConfigData()
    const body = new URLSearchParams({
      code,
      client_id,
      client_secret
    }).toString()
    const res = await fetch(rootUrl, {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const data: OauthGithubGetTokenResponse = await res.json()
    return data
  }

  async getGithubUser(code: string) {
    const { access_token } = await this.getGithubToken(code)
    const rootUrl = 'https://api.github.com/user'
    const res = await fetch(rootUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const data: OauthGithubUser = await res.json()
    return data
  }

  async checkGithubUser(data: OauthGithubUser) {
    const user = await this.userService.findOneBy({ email: data.email })
    if (!user) {
      const newUser = await this.userService.create({
        email: data.email,
        name: data.name,
        avatar: data.avatar_url,
        password: data.id.toString(),
        status: UserStatus.VERIFY
      })
      const { accessToken, refreshToken } =
        await this.jwtService.generateAccessRefreshToken(newUser)
      return { accessToken, refreshToken, isNew: true }
    }
    const { accessToken, refreshToken } = await this.jwtService.generateAccessRefreshToken(user)
    return { accessToken, refreshToken, isNew: false }
  }

  async loginWithGithub(code: string) {
    const data = await this.getGithubUser(code)
    const { accessToken, isNew, refreshToken } = await this.checkGithubUser(data)
    const frontendUrl = this.configService.get<string>('FRONTEND_HOST')
    const url = `${frontendUrl}/api/oauth?accessToken=${accessToken}&refreshToken=${refreshToken}&isNew=${isNew}`
    return url
  }
}
