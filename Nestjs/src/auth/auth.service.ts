import { UserService } from '@/users/user.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { loginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Otp, TOKEN_TYPE } from './entities'
import { JwtServiceCustom } from './jwt/jwt.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private jwtServiceCustom: JwtServiceCustom,
    private readonly userService: UserService
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
    await this.jwtServiceCustom.delete(refreshToken)
  }
}
