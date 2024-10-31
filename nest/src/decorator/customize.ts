import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const AccessToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

export const RESPONSE_MESSAGE = 'reponse_message'
export const ReponseMessage = (message: string) => {
  return SetMetadata(RESPONSE_MESSAGE, message)
}

// Decorator để lưu trữ thông tin về các thuộc tính của class
export const Property = (target: any, propertyKey: string) => {
  const properties = Reflect.getMetadata('properties', target) || []
  properties.push(propertyKey)
  Reflect.defineMetadata('properties', properties, target)
  const type = Reflect.getMetadata('design:type', target, propertyKey)
  Reflect.defineMetadata('type', type, target, propertyKey)
}
