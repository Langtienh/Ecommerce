import { RESPONSE_MESSAGE } from '@/decorator/customize'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Reponse<T> {
  statusCode: number
  message: string
  data: any
}

@Injectable()
export class TransformsInterceptor<T> implements NestInterceptor<T, Reponse<T>> {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Reponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) || 'Success',
        data: data?.result
          ? {
              meta: data.meta,
              result: data.result
            }
          : data
      }))
    )
  }
}
