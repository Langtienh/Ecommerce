import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { AddressType } from '../entity/address.entity'

export class CreateAddressDto {
  @IsEnum(AddressType)
  @IsNotEmpty()
  type: AddressType

  @MaxLength(63)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(127)
  @IsString()
  @IsNotEmpty()
  address: string

  @MaxLength(127)
  @IsString()
  @IsNotEmpty()
  detail: string

  @IsNotEmpty()
  isDefault: boolean
}
