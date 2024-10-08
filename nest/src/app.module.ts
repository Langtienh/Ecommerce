import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthenticationsModule } from './authentications/authentications.module';

@Module({
  imports: [ UsersModule, AuthenticationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
