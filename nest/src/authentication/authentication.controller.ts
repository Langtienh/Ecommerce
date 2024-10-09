import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, ReponseMessage } from 'src/decorator/customize';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { loginDto } from './dto/login.dto';
import {
  ChangePasswordDto,
  ResetPasswordDto,
  VerifyFogotPasswordDto,
} from './dto/password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private userService: UsersService,
  ) {}

  @Public()
  @ReponseMessage('User created successfully')
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  @Public()
  @ReponseMessage('User login successfully')
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authenticationService.login(loginDto);
  }

  @Public()
  @ReponseMessage('Refresh token successfully')
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshToken(refreshTokenDto);
  }

  @Public()
  @ReponseMessage('Verify email successfully')
  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authenticationService.verifyEmail(verifyEmailDto);
  }

  @Public()
  @ReponseMessage('Verify forgot password token successfully')
  @Post('verify-forgot-password-token')
  verifyFogotPassworToken(@Body() body: VerifyFogotPasswordDto) {
    return this.authenticationService.verifyFogotPassworToken(body);
  }

  @Public()
  @ReponseMessage('Reset password successfully')
  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authenticationService.resetPassword(body);
  }

  @ReponseMessage('Change password successfully')
  @Post('change-password')
  changePassword(@Body() body: ChangePasswordDto) {
    return this.authenticationService.changePassword(body);
  }
}
