import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { OTP_TYPE } from 'src/mail/constants'
import { MailService } from 'src/mail/mail.service'
import { UserStatus } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { CONFIG_TOKEN } from './constants'
import { loginDto } from './dto/login.dto'
import {
  ChangePasswordDto,
  ResetPasswordDto,
  VerifyFogotPasswordDto,
  VerifyForgotPasswordOTPDto
} from './dto/password.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { RegisterDto } from './dto/register.dto'
import { VerifyEmailDto } from './dto/verify-email.dto'
import { Token, TOKEN_TYPE } from './entities/token.entity'
import { AccessTokenData, AccessTokenPayload, TokenData, TokenPayload } from './types/token-payload'

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Token) private TokenRepo: Repository<Token>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
    private readonly mailService: MailService
  ) {}

  async generateJwtToken(payload: TokenPayload, tokenType: TOKEN_TYPE, otp?: string) {
    const { id } = payload
    const payloadData = { id }
    if (tokenType === TOKEN_TYPE.REFRESH) {
      await this.TokenRepo.delete({ userId: id, tokenType })
    }
    const token: string = await this.jwtService.signAsync(payloadData, {
      secret: this.configService.get(CONFIG_TOKEN[tokenType].secret),
      expiresIn: this.configService.get(CONFIG_TOKEN[tokenType].expiresIn)
    })
    if (tokenType != TOKEN_TYPE.REFRESH) {
      await this.TokenRepo.save({
        tokenType,
        token,
        otp,
        user: { id }
      })
    } else {
      await this.userService.updateRefreshToken(id, token)
    }
    return token
  }

  generateAccsessToken(payload: AccessTokenPayload) {
    const { email, id, roleId, status } = payload
    const payloadData = { email, id, roleId, status }
    return this.jwtService.sign(payloadData, {
      secret: this.configService.get(CONFIG_TOKEN.access.secret),
      expiresIn: this.configService.get(CONFIG_TOKEN.access.expiresIn)
    })
  }

  async verifyJwtToken(token: string, tokenType: TOKEN_TYPE): Promise<TokenData> {
    try {
      const data = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(CONFIG_TOKEN[tokenType].secret)
      })
      return data
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  generateAccessRefreshToken(payload: AccessTokenPayload) {
    return Promise.all([this.generateAccsessToken(payload), this.generateJwtToken(payload, TOKEN_TYPE.REFRESH)])
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto)
    const [accessToken, refreshToken] = await this.generateAccessRefreshToken(user)
    const otp = this.generateOtp(6)
    const verifyEmailToken = await this.generateJwtToken({ id: user.id }, TOKEN_TYPE.VERIFY_EMAIL, otp)
    await this.mailService.sendWithOtp(otp, user.email, OTP_TYPE.verifyEmail)
    return { verifyEmailToken, accessToken, refreshToken: refreshToken, user: this.userService.hidenFiledUser(user) }
  }

  async login(loginDto: loginDto) {
    const user = await this.userService.findByEmail(loginDto.email)
    if (!user) throw new UnauthorizedException('Email or password is incorrect')
    const isPasswordMatch = await this.userService.comparePassword(loginDto.password, user.password)
    if (!isPasswordMatch) throw new UnauthorizedException('Email or password is incorrect')
    const [accessToken, refreshToken] = await this.generateAccessRefreshToken(user)
    return { accessToken, refreshToken, user: this.userService.hidenFiledUser(user) }
  }

  async logout(refreshTokenDto: RefreshTokenDto, userId: number) {
    const { refreshToken } = refreshTokenDto
    const data = await this.verifyJwtToken(refreshToken, TOKEN_TYPE.REFRESH)
    if (data.id !== userId) throw new UnauthorizedException('Invalid refresh token')
    await this.TokenRepo.delete({ token: refreshToken })
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto
    const data = await this.verifyJwtToken(refreshToken, TOKEN_TYPE.REFRESH)
    const user = await this.userService.findOne(data.id)
    const [accessToken, newRefreshToken] = await this.generateAccessRefreshToken(user)
    return { accessToken, refreshToken: newRefreshToken, user: this.userService.hidenFiledUser(user) }
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { verifyEmailToken, otp } = verifyEmailDto
    const data = await this.verifyJwtToken(verifyEmailToken, TOKEN_TYPE.VERIFY_EMAIL)
    const token = await this.TokenRepo.findOne({
      where: {
        token: verifyEmailToken,
        otp
      }
    })
    const user = await this.userService.verifyAccount(data.id)
    if (!token) throw new UnauthorizedException('Otp không đúng')
    await this.TokenRepo.delete({ token: verifyEmailToken })
    const [accessToken, refreshToken] = await this.generateAccessRefreshToken(user)
    return { accessToken, refreshToken, user: this.userService.hidenFiledUser(user) }
  }

  async reSendVerifyEmail(payload: AccessTokenData) {
    const { id, status, email } = payload

    if (status !== UserStatus.UNVERIFY) throw new UnauthorizedException('User already verified')
    await this.TokenRepo.delete({ userId: id, tokenType: TOKEN_TYPE.VERIFY_EMAIL })
    const otp = this.generateOtp(6)
    const verifyEmailToken = await this.generateJwtToken({ id }, TOKEN_TYPE.VERIFY_EMAIL, otp)
    await this.mailService.sendWithOtp(otp, email, OTP_TYPE.verifyEmail)
    return { token: verifyEmailToken }
  }

  async sendMailForgotPassword(email: string) {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Email not found')
    // tạo token tự động lưu vào db rồi
    const oldToken = await this.TokenRepo.findOne({
      where: { userId: user.id, tokenType: TOKEN_TYPE.FORGOT_PASSWORD }
    })
    if (oldToken) {
      await this.mailService.sendWithOtp(oldToken.otp, email, OTP_TYPE.restorePassword)
      return { token: oldToken.token }
    }
    const otp = this.generateOtp(6)
    const token = await this.generateJwtToken({ id: user.id }, TOKEN_TYPE.FORGOT_PASSWORD, otp)
    await this.mailService.sendWithOtp(otp, email, OTP_TYPE.restorePassword)
    return { token }
  }

  async reSendMailForgotPassword(email: string) {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Email not found')
    await this.TokenRepo.delete({ userId: user.id, tokenType: TOKEN_TYPE.FORGOT_PASSWORD })
    const otp = this.generateOtp(6)
    const token = await this.generateJwtToken({ id: user.id }, TOKEN_TYPE.FORGOT_PASSWORD, otp)
    await this.mailService.sendWithOtp(otp, email, OTP_TYPE.restorePassword)
    return {
      token: token
    }
  }

  async verifyFogotPassworToken(body: VerifyFogotPasswordDto) {
    const { forgotPasswordToken } = body
    await this.verifyJwtToken(forgotPasswordToken, TOKEN_TYPE.FORGOT_PASSWORD)
    const oldToken = await this.TokenRepo.findOne({
      where: {
        token: forgotPasswordToken
      }
    })
    if (!oldToken) throw new UnauthorizedException('Token is invalid')
  }

  async verifyForgotPasswordOtp(body: VerifyForgotPasswordOTPDto) {
    const { forgotPasswordToken, otp } = body
    const data = await this.verifyJwtToken(forgotPasswordToken, TOKEN_TYPE.FORGOT_PASSWORD)
    const isExistToken = await this.TokenRepo.findOne({
      where: { userId: data.id, tokenType: TOKEN_TYPE.FORGOT_PASSWORD, otp }
    })
    if (!isExistToken) throw new UnauthorizedException('OTP không đúng')
  }

  async resetPassword(body: ResetPasswordDto) {
    const { forgotPasswordToken, password, otp } = body
    const data = await this.verifyJwtToken(forgotPasswordToken, TOKEN_TYPE.FORGOT_PASSWORD)
    const isExistToken = await this.TokenRepo.findOne({
      where: { userId: data.id, tokenType: TOKEN_TYPE.FORGOT_PASSWORD, otp }
    })
    if (!isExistToken) throw new UnauthorizedException('Lỗi xác thực')
    await this.TokenRepo.delete({
      userId: data.id,
      tokenType: TOKEN_TYPE.FORGOT_PASSWORD
    })
    const user = await this.userService.updatePassword(data.id, password)
    const [accessToken, refreshToken] = await this.generateAccessRefreshToken(user)
    return { accessToken, refreshToken, user: this.userService.hidenFiledUser(user) }
  }

  async changePassword(userId, body: ChangePasswordDto) {
    await this.userService.changePassword(userId, body.oldPassword, body.password)
  }

  generateOtp(length: number): string {
    let otp = ''
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString()
    }
    return otp
  }
}
