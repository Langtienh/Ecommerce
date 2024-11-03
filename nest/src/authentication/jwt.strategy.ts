// Cần phải có file này để xác thực người dùng bằng JWT
// Mục đích của file là decode token và trả về thông tin người dùng
import { Role } from '@/roles/entities/role.entity'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'
import { AccessTokenData } from './types/token-payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
    })
  }

  async validate(payload: AccessTokenData) {
    const { roleId } = payload
    const role = await this.roleRepo.findOne({
      where: { id: roleId },
      relations: {
        permissions: true
      }
    })
    return { ...payload, permissions: role?.permissions || [] }
  }
}
