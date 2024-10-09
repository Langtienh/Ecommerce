import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginDto } from './dto/login.dto';
import {
  ChangePasswordDto,
  ResetPasswordDto,
  VerifyFogotPasswordDto,
} from './dto/password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class AuthenticationService {
  constructor(@InjectRepository(Token) private TokenRepo: Repository<Token>) {}

  async login(loginDto: loginDto) {
    return loginDto;
  }

  async refreshToken(refreshToken: RefreshTokenDto) {
    return refreshToken;
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    return verifyEmailDto;
  }

  async verifyFogotPassworToken(body: VerifyFogotPasswordDto) {
    return body;
  }

  async resetPassword(body: ResetPasswordDto) {
    return body;
  }

  async changePassword(body: ChangePasswordDto) {
    return body;
  }
}
