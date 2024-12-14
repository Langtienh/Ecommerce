import { AccessToken, Public, ResponseMessage } from '@/decorator/customize'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { loginDto } from './dto/login.dto'
import {
  ChangePasswordDto,
  ResetPasswordDto,
  SendEmailDto,
  VerifyForgotPasswordOTPDto
} from './dto/password.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { RegisterDto } from './dto/register.dto'
import { VerifyEmailDto } from './dto/verify-email.dto'
import { AccessTokenData } from './jwt/jwt.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ResponseMessage('Đăng nhập thành công')
  async login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto)
  }

  @Post('logout')
  @ResponseMessage('Đăng xuất thành công')
  async logout(@Body() body: RefreshTokenDto, @AccessToken() payload: AccessTokenData) {
    return this.authService.logout(body, payload.id)
  }

  @Public()
  @Post('register')
  @ResponseMessage('Đăng ký thành công')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }

  @Public()
  @ResponseMessage('Refresh token successfully')
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Public()
  @ResponseMessage('Xác thực email thành công')
  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto)
  }

  @ResponseMessage('Đã gửi lại email xác thực')
  @Get('resend-verify-email')
  resendVerifyEmail(@AccessToken() payload: AccessTokenData) {
    return this.authService.reSendVerifyEmail(payload)
  }

  @Public()
  @ResponseMessage('Gửi email thành công')
  @Post('password/send')
  forgotPassword(@Body() body: SendEmailDto) {
    return this.authService.sendMailForgotPassword(body.email)
  }

  @Public()
  @ResponseMessage('OTP chính xác')
  @Post('password/verify-otp')
  verifyForgotPasswordOTP(@Body() body: VerifyForgotPasswordOTPDto) {
    return this.authService.verifyForgotPasswordOtp(body)
  }

  @Public()
  @ResponseMessage('Khôi phục mật khẩu thành công')
  @Post('password/reset')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body)
  }

  @ResponseMessage('Đổi mật khẩu thành công')
  @Post('password/change')
  changePassword(@Body() body: ChangePasswordDto, @AccessToken() payload: AccessTokenData) {
    return this.authService.changePassword(payload.id, body)
  }
}
