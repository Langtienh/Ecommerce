import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AccessToken, Public, ReponseMessage } from 'src/decorator/customize'
import { AuthenticationService } from './authentication.service'
import { loginDto } from './dto/login.dto'
import { ChangePasswordDto, ResetPasswordDto, SendEmailDto, VerifyFogotPasswordDto } from './dto/password.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { RegisterDto } from './dto/register.dto'
import { VerifyEmailDto } from './dto/verify-email.dto'
import { AccessTokenData } from './types/token-payload'

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @ReponseMessage('User created successfully')
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authenticationService.register(registerDto)
  }

  @Public()
  @ReponseMessage('User login successfully')
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authenticationService.login(loginDto)
  }

  @ReponseMessage('Logout successfully')
  @Post('logout')
  logout(@Body() body: RefreshTokenDto, @AccessToken() payload: AccessTokenData) {
    return this.authenticationService.logout(body, payload.id)
  }

  @Public()
  @ReponseMessage('Refresh token successfully')
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshToken(refreshTokenDto)
  }

  @Public()
  @ReponseMessage('Verify email successfully')
  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authenticationService.verifyEmail(verifyEmailDto)
  }

  @ReponseMessage('Resend verify email successfully')
  @Get('resend-verify-email')
  resendVerifyEmail(@AccessToken() payload: AccessTokenData) {
    return this.authenticationService.reSendVerifyEmail(payload)
  }

  @Public()
  @ReponseMessage('Send forgot password email successfully')
  @Post('password/send')
  forgotPassword(@Body() body: SendEmailDto) {
    return this.authenticationService.sendMailForgotPassword(body.email)
  }

  @Public()
  @ReponseMessage('Resend verify email successfully')
  @Post('password/resend')
  resendForgotPassword(@Body() body: SendEmailDto) {
    return this.authenticationService.reSendMailForgotPassword(body.email)
  }

  @Public()
  @ReponseMessage('Verify forgot password token successfully')
  @Post('password/verify')
  verifyFogotPassworToken(@Body() body: VerifyFogotPasswordDto) {
    return this.authenticationService.verifyFogotPassworToken(body)
  }

  @Public()
  @ReponseMessage('Reset password successfully')
  @Post('password/reset')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authenticationService.resetPassword(body)
  }

  @ReponseMessage('Change password successfully')
  @Post('password/change')
  changePassword(@Body() body: ChangePasswordDto, @AccessToken() payload: AccessTokenData) {
    return this.authenticationService.changePassword(payload.id, body)
  }
}
