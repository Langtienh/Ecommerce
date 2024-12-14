import { AccessToken, Public, ResponseMessage } from '@/decorator/customize'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { loginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
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
}
