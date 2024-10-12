import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CONFIG_TOKEN } from './constants';
import { loginDto } from './dto/login.dto';
import {
  ChangePasswordDto,
  ResetPasswordDto,
  VerifyFogotPasswordDto,
} from './dto/password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { Token, TOKEN_TYPE } from './entities/token.entity';
import {
  AccessTokenData,
  AccessTokenPayload,
  TokenData,
  TokenPayload,
} from './types/token-payload';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Token) private TokenRepo: Repository<Token>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async generateJwtToken(payload: TokenPayload, tokenType: TOKEN_TYPE) {
    const { id } = payload;
    const payloadData = { id };
    if (tokenType === TOKEN_TYPE.REFRESH) {
      await this.TokenRepo.delete({ userId: id, tokenType });
    }
    const token: string = await this.jwtService.signAsync(payloadData, {
      secret: this.configService.get(CONFIG_TOKEN[tokenType].secret),
      expiresIn: this.configService.get(CONFIG_TOKEN[tokenType].expiresIn),
    });
    await this.TokenRepo.save({
      tokenType,
      token,
      user: { id },
    });
    return token;
  }

  generateAccsessToken(payload: AccessTokenPayload) {
    const { email, id, roleId, status } = payload;
    const payloadData = { email, id, roleId, status };
    return this.jwtService.sign(payloadData, {
      secret: this.configService.get(CONFIG_TOKEN.access.secret),
      expiresIn: this.configService.get(CONFIG_TOKEN.access.expiresIn),
    });
  }

  async verifyJwtToken(
    token: string,
    tokenType: TOKEN_TYPE,
  ): Promise<TokenData> {
    try {
      const data = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(CONFIG_TOKEN[tokenType].secret),
      });
      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  generateAccessRefreshToken(payload: AccessTokenPayload) {
    return Promise.all([
      this.generateAccsessToken(payload),
      this.generateJwtToken(payload, TOKEN_TYPE.REFRESH),
    ]);
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    const [accessToken, refreshToken] =
      await this.generateAccessRefreshToken(user);
    const verifyEmailToken = await this.generateJwtToken(
      { id: user.id },
      TOKEN_TYPE.VERIFY_EMAIL,
    );

    // todo send email
    return { verifyEmailToken, accessToken, refreshToken, user };
  }

  async login(loginDto: loginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user)
      throw new UnauthorizedException('Email or password is incorrect');
    const isPasswordMatch = await this.userService.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatch)
      throw new UnauthorizedException('Email or password is incorrect');
    const [accessToken, refreshToken] =
      await this.generateAccessRefreshToken(user);
    return { accessToken, refreshToken, user };
  }

  async logout(refreshTokenDto: RefreshTokenDto, userId: number) {
    const { refreshToken } = refreshTokenDto;
    const data = await this.verifyJwtToken(refreshToken, TOKEN_TYPE.REFRESH);
    if (data.id !== userId)
      throw new UnauthorizedException('Invalid refresh token');
    await this.TokenRepo.delete({ token: refreshToken });
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    const data = await this.verifyJwtToken(refreshToken, TOKEN_TYPE.REFRESH);
    const user = await this.userService.findOne(data.id);
    const [accessToken, newRefreshToken] =
      await this.generateAccessRefreshToken(user);
    return { accessToken, refreshToken: newRefreshToken, user };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { verifyEmailToken } = verifyEmailDto;
    const data = await this.verifyJwtToken(
      verifyEmailToken,
      TOKEN_TYPE.VERIFY_EMAIL,
    );
    const [token, user] = await Promise.all([
      this.TokenRepo.findOne({
        where: {
          token: verifyEmailToken,
        },
      }),
      this.userService.verifyAccount(data.id),
    ]);
    if (!token) throw new UnauthorizedException('Accout is verified');
    await this.TokenRepo.delete({ token: verifyEmailToken });
    const [accessToken, refreshToken] =
      await this.generateAccessRefreshToken(user);
    return { accessToken, refreshToken, user };
  }

  async reSendVerifyEmail(payload: AccessTokenData) {
    const { id, status } = payload;
    // todo send email
    if (status !== UserStatus.UNVERIFY)
      throw new UnauthorizedException('User already verified');
    const verifyEmailToken = await this.TokenRepo.findOne({
      where: { userId: id, tokenType: TOKEN_TYPE.VERIFY_EMAIL },
    });
    return { token: verifyEmailToken.token };
  }

  async sendMailForgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email not found');
    // tạo token tự động lưu vào db rồi
    const oldToken = await this.TokenRepo.findOne({
      where: { userId: user.id, tokenType: TOKEN_TYPE.FORGOT_PASSWORD },
    });
    if (oldToken) return { token: oldToken.token };
    const token = await this.generateJwtToken(
      { id: user.id },
      TOKEN_TYPE.FORGOT_PASSWORD,
    );
    // todo send email
    return { token };
  }

  /**
   *
   * @param email
   * @returns
   * @description Resend forgot password token
   * @todo Kiểm tra xem email có tồn tại không
   * @todo send email
   * @todo kiểm tra xem đã có token chưa, chưa thì tạo mới, có thì trả về token đó
   */
  async reSendMailForgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email not found');
    const token = await this.TokenRepo.findOne({
      where: { userId: user.id, tokenType: TOKEN_TYPE.FORGOT_PASSWORD },
    });
    if (token) return { token: token.token };
    const newToken = await this.generateJwtToken(
      { id: user.id },
      TOKEN_TYPE.FORGOT_PASSWORD,
    );
    // todo send email

    return { token: newToken };
  }

  async verifyFogotPassworToken(body: VerifyFogotPasswordDto) {
    const { forgotPasswordToken } = body;
    await this.verifyJwtToken(forgotPasswordToken, TOKEN_TYPE.FORGOT_PASSWORD);
    const oldToken = await this.TokenRepo.findOne({
      where: {
        token: forgotPasswordToken,
      },
    });
    if (!oldToken) throw new UnauthorizedException('Token is invalid');
  }

  private filterUser(user: { password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ..._user } = user;
    return _user;
  }

  async resetPassword(body: ResetPasswordDto) {
    const { forgotPasswordToken, password } = body;
    const data = await this.verifyJwtToken(
      forgotPasswordToken,
      TOKEN_TYPE.FORGOT_PASSWORD,
    );
    const isExistToken = await this.TokenRepo.findOne({
      where: { userId: data.id, tokenType: TOKEN_TYPE.FORGOT_PASSWORD },
    });
    if (!isExistToken) throw new UnauthorizedException('Token is invalid');
    await this.TokenRepo.delete({
      userId: data.id,
      tokenType: TOKEN_TYPE.FORGOT_PASSWORD,
    });
    const user = await this.userService.updatePassword(data.id, password);
    // chỗ này trả về có password
    const [accessToken, refreshToken] =
      await this.generateAccessRefreshToken(user);
    return { accessToken, refreshToken, user: this.filterUser(user) };
  }

  async changePassword(userId, body: ChangePasswordDto) {
    await this.userService.changePassword(
      userId,
      body.oldPassword,
      body.password,
    );
  }
}
