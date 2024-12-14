import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard'
import { TransformsInterceptor } from './core/tranforms.interceptor'
import { CustomValidationPipe } from './core/validation'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT')
  const reflector = app.get(Reflector)

  // Sử dụng CustomValidationPipe để xử lý validation
  // Phải để transform: true thì mới sử dụng được Transform trong class-validator
  app.useGlobalPipes(
    // new ValidationPipe({
    new CustomValidationPipe({
      transform: true
    })
  )

  // Sử dụng ClassSerializerInterceptor toàn cục
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  // Sử dụng JwtAuthGuard để xác thực người dùng
  app.useGlobalGuards(new JwtAuthGuard(reflector))

  // enable cors
  // origin: Fe domain, example: 'http://localhost:3000',
  // origin: '*', // cho phép tất cả các domain
  // origin: true, // cho phép tất cả domain cùng origin
  // credentials: true, // cho phép gửi cookie
  app.enableCors()

  // transform response
  app.useGlobalInterceptors(new TransformsInterceptor(reflector))

  // congif versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  await app.listen(PORT)
}
bootstrap()
