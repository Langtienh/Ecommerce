import { UserModule } from '@/users/user.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressService } from './address.services'
import { Address } from './entity/address.entity'
import { MeController } from './me.controller'

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Address])],
  controllers: [MeController],
  providers: [AddressService]
})
export class MeModule {}
