import { IS_PUBLIC_KEY } from '@/decorator/customize'
// import { Permission } from '@/permission/entities/permission.entity'
import {
  ExecutionContext,
  // ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
// import { Request } from 'express'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException(info.message)
    }
    // const request: Request = context.switchToHttp().getRequest()
    // const path = request.route.path as string
    // const permissions = user.permissions as Permission[]
    // const isNoAuthorization =
    //   path.startsWith('/api/v1/authentication') || path.startsWith('/api/v1/me')
    // if (isNoAuthorization) return user
    // const isMath = permissions.some((permission) => {
    //   const { method, apiPath } = permission
    //   return request.method === method && (path === apiPath || path === `/${apiPath}`)
    // })
    // if (!isMath) throw new ForbiddenException('Bạn không có quyền truy cập')
    return user
  }
}
