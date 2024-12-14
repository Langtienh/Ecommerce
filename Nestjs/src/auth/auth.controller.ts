import { AccessToken, Public, ResponseMessage } from '@/decorator/customize'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { loginDto } from './dto/login.dto'
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

  @ResponseMessage('Resend verify email successfully')
  @Get('resend-verify-email')
  resendVerifyEmail(@AccessToken() payload: AccessTokenData) {
    return this.authService.reSendVerifyEmail(payload)
  }
}
