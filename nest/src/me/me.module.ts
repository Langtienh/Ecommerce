import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressService } from './address.services'
import { Address } from './entity/address.entity'
import { MeController } from './me.controller'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Address])],
  controllers: [MeController],
  providers: [AddressService]
})
export class MeModule {}
