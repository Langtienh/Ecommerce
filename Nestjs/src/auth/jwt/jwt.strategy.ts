// Cần phải có file này để xác thực người dùng bằng JWT
// Mục đích của file là decode token và trả về thông tin người dùng
import { RolesService } from '@/roles/roles.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AccessTokenData } from './jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private roleService: RolesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
    })
  }

  async validate(payload: AccessTokenData) {
    const { roleId } = payload
    const role = await this.roleService.findOne(roleId)
    return { ...payload, permissions: role?.permissions || [] }
  }
}
