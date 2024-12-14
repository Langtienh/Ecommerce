import { OTP_TYPE } from '@/mail/mail.config'
import { MailService } from '@/mail/mail.service'
import { UserStatus } from '@/users/entities/user.entity'
import { UserService } from '@/users/user.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { loginDto } from './dto/login.dto'
import { ChangePasswordDto, ResetPasswordDto, VerifyForgotPasswordOTPDto } from './dto/password.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { RegisterDto } from './dto/register.dto'
import { VerifyEmailDto } from './dto/verify-email.dto'
import { Otp, TOKEN_TYPE } from './entities'
import { AccessTokenData } from './jwt/jwt.interface'
import { JwtServiceCustom } from './jwt/jwt.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private jwtServiceCustom: JwtServiceCustom,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  async login(loginDto: loginDto) {
    const users = await this.userService.find({ where: { email: loginDto.email } })
    const user = users[0]
    if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng')
    const isPasswordMatch = await this.userService.comparePassword(loginDto.password, user.password)
    if (!isPasswordMatch) throw new UnauthorizedException('Email hoặc mật khẩu không đúng')
    const { accessToken, refreshToken } =
      await this.jwtServiceCustom.generateAccessRefreshToken(user)
    return {
      accessToken,
      refreshToken,
      user
    }
  }

  async logout(refreshTokenDto: RefreshTokenDto, userId: number) {
    const { refreshToken } = refreshTokenDto
    const data = await this.jwtServiceCustom.verifyJwtToken(refreshToken, TOKEN_TYPE.REFRESH)
    if (data.id !== userId) throw new UnauthorizedException('Invalid refresh token')
    await this.jwtServiceCustom.deleteBy({ token: refreshToken })
  }

  generateOtp(length: number): string {
    let otp = ''
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString()
    }
    return otp
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto)
    const { accessToken, refreshToken } =
      await this.jwtServiceCustom.generateAccessRefreshToken(user)
    const otp = this.generateOtp(6)
    const verifyEmailToken = await this.jwtServiceCustom.generateJwtToken(
      { id: user.id },
      TOKEN_TYPE.VERIFY_EMAIL
    )
    await this.otpRepository.save({ otp, tokenId: verifyEmailToken.id })
    await this.mailService.sendWithOtp(otp, user.email, OTP_TYPE.verifyEmail)
    return {
      verifyEmailToken: verifyEmailToken.token,
      accessToken,
      refreshToken: refreshToken,
      user
    }
  }

  async refreshToken(body: RefreshTokenDto) {
    const data = await this.jwtServiceCustom.verifyJwtToken(body.refreshToken, TOKEN_TYPE.REFRESH)
    await this.jwtServiceCustom.deleteBy({ token: body.refreshToken })
    const user = await this.userService.findOne(data.id)
    const { accessToken, refreshToken } =
      await this.jwtServiceCustom.generateAccessRefreshToken(user)
    return {
      accessToken,
      refreshToken,
      user
    }
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { verifyEmailToken, otp } = verifyEmailDto
    const data = await this.jwtServiceCustom.verifyJwtToken(
      verifyEmailToken,
      TOKEN_TYPE.VERIFY_EMAIL
    )
    const tokenRow = await this.jwtServiceCustom.findOneBy({
      token: verifyEmailToken
    })
    if (!tokenRow) throw new UnauthorizedException('Verify email token không đúng')
    const user = await this.userService.update(data.id, { status: UserStatus.VERIFY })
    const otpRow = await this.otpRepository.findOneBy({ tokenId: tokenRow.id, otp })
    if (!otpRow) throw new UnauthorizedException('Otp không đúng')
    // verify email success
    await this.otpRepository.delete({ tokenId: tokenRow.id })
    await this.jwtServiceCustom.deleteBy({ token: verifyEmailToken })
    const { accessToken, refreshToken } =
      await this.jwtServiceCustom.generateAccessRefreshToken(user)
    return {
      accessToken,
      refreshToken,
      user
    }
  }

  async reSendVerifyEmail(payload: AccessTokenData) {
    const { id, status, email } = payload
    if (status !== UserStatus.UNVERIFY) throw new UnauthorizedException('User already verified')
    const tokenRow = await this.jwtServiceCustom.findOneBy({
      userId: id,
      type: TOKEN_TYPE.VERIFY_EMAIL
    })
    if (tokenRow) await this.otpRepository.delete({ tokenId: tokenRow.id })
    await this.jwtServiceCustom.deleteBy({
      userId: id,
      type: TOKEN_TYPE.VERIFY_EMAIL
    })
    const verifyEmailTokenRow = await this.jwtServiceCustom.generateJwtToken(
      { id },
      TOKEN_TYPE.VERIFY_EMAIL
    )
    const otp = this.generateOtp(6)
    await this.otpRepository.save({ otp, tokenId: verifyEmailTokenRow.id })
    await this.mailService.sendWithOtp(otp, email, OTP_TYPE.verifyEmail)
    return { verifyEmailToken: verifyEmailTokenRow.token }
  }

  async sendMailForgotPassword(email: string) {
    const user = await this.userService.findOneBy({ email })
    if (!user) throw new UnauthorizedException('Không tìm thấy user')
    const prevTokenRow = await this.jwtServiceCustom.findOneBy({
      userId: user.id,
      type: TOKEN_TYPE.FORGOT_PASSWORD
    })
    if (prevTokenRow) {
      await this.otpRepository.delete({ tokenId: prevTokenRow.id })
      await this.jwtServiceCustom.deleteBy({
        userId: user.id,
        type: TOKEN_TYPE.FORGOT_PASSWORD
      })
    }
    const tokenRow = await this.jwtServiceCustom.generateJwtToken(
      { id: user.id },
      TOKEN_TYPE.FORGOT_PASSWORD
    )
    const otp = this.generateOtp(6)
    await this.otpRepository.save({ otp, tokenId: tokenRow.id })
    await this.mailService.sendWithOtp(otp, email, OTP_TYPE.restorePassword)
    return { forgotPasswordToken: tokenRow.token }
  }

  async verifyForgotPasswordOtp(body: VerifyForgotPasswordOTPDto) {
    const { forgotPasswordToken, otp } = body
    const data = await this.jwtServiceCustom.verifyJwtToken(
      forgotPasswordToken,
      TOKEN_TYPE.FORGOT_PASSWORD
    )
    const tokenRow = await this.jwtServiceCustom.findOneBy({
      userId: data.id,
      type: TOKEN_TYPE.FORGOT_PASSWORD
    })
    if (!tokenRow) throw new UnauthorizedException()
    const otpRow = await this.otpRepository.findOneBy({ tokenId: tokenRow.id, otp })
    if (!otpRow) throw new UnauthorizedException('Otp không đúng')
  }

  async resetPassword(body: ResetPasswordDto) {
    const { forgotPasswordToken, password, otp } = body
    const data = await this.jwtServiceCustom.verifyJwtToken(
      forgotPasswordToken,
      TOKEN_TYPE.FORGOT_PASSWORD
    )
    const tokenRow = await this.jwtServiceCustom.findOneBy({
      userId: data.id,
      type: TOKEN_TYPE.FORGOT_PASSWORD
    })
    if (!tokenRow) throw new UnauthorizedException('Lỗi xác thực')
    const otpRow = await this.otpRepository.findOneBy({ tokenId: tokenRow.id, otp })
    if (!otpRow) throw new UnauthorizedException('Otp không đúng')
    const user = await this.userService.resetPassword(data.id, password)
    await this.jwtServiceCustom.deleteBy({
      userId: data.id,
      type: TOKEN_TYPE.FORGOT_PASSWORD
    })
    const { accessToken, refreshToken } =
      await this.jwtServiceCustom.generateAccessRefreshToken(user)
    return {
      accessToken,
      refreshToken,
      user
    }
  }

  async changePassword(userId: number, body: ChangePasswordDto) {
    await this.userService.changePassword(userId, body.oldPassword, body.password)
  }
}
