import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsController } from './authentications.controller';

@Module({
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService],
})
export class AuthenticationsModule {}
