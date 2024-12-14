import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { Token, TOKEN_TYPE } from '../entities'
import { CONFIG_TOKEN } from './jwt.config'
import { AccessTokenPayload, TokenData, TokenPayload } from './jwt.interface'

@Injectable()
export class JwtServiceCustom {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
    private readonly configService: ConfigService
  ) {}

  async generateJwtToken(payload: TokenPayload, tokenType: TOKEN_TYPE) {
    const { id } = payload
    const payloadData = { id }
    const token: string = await this.jwtService.signAsync(payloadData, {
      secret: this.configService.get(CONFIG_TOKEN[tokenType].secret),
      expiresIn: this.configService.get(CONFIG_TOKEN[tokenType].expiresIn)
    })
    return await this.tokenRepository.save({ token, userId: id, type: tokenType })
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
      if (error instanceof Error) throw new UnauthorizedException(error.message)
      throw new UnauthorizedException()
    }
  }

  async generateAccessRefreshToken(payload: AccessTokenPayload) {
    const accessToken = this.generateAccsessToken(payload)
    const refreshToken = await this.generateJwtToken(payload, TOKEN_TYPE.REFRESH)
    return { accessToken, refreshToken: refreshToken.token }
  }

  async deleteBy(where: FindOptionsWhere<Token>) {
    const tokenData = await this.tokenRepository.findOneBy(where)
    if (!tokenData) throw new UnauthorizedException('Invalid token')
    await this.tokenRepository.delete(where)
  }

  findOneBy(where: FindOptionsWhere<Token>) {
    return this.tokenRepository.findOneBy(where)
  }
}
