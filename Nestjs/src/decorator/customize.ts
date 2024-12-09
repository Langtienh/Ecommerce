import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const AccessToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

export const RESPONSE_MESSAGE = 'Response_message'
export const ResponseMessage = (message: string) => {
  return SetMetadata(RESPONSE_MESSAGE, message)
}
