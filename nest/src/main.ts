import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformsInterceptor } from './core/tranforms.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // Sử dụng CustomValidationPipe để xử lý validation
  // Phải để transform: true thì mới sử dụng được Transform trong class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Sử dụng ClassSerializerInterceptor toàn cục
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Sử dụng JwtAuthGuard để xác thực người dùng
  // app.useGlobalGuards(new JwtAuthGuard(reflector));

  // enable cors
  // origin: Fe domain, example: 'http://localhost:3000',
  // origin: '*', // cho phép tất cả các domain
  // origin: true, // cho phép tất cả domain cùng origin
  // credentials: true, // cho phép gửi cookie
  app.enableCors();

  // transform response
  app.useGlobalInterceptors(new TransformsInterceptor(reflector));

  // congif versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = configService.get<number>('PORT');

  await app.listen(PORT);
}
bootstrap();
