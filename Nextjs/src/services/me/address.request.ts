import { CrudNoGetMany } from '@/lib/crud'
import { Address, AddressBodyType } from './me.schema'

export class AddressRequest extends CrudNoGetMany<
  Address,
  Address,
  Address,
  AddressBodyType,
  AddressBodyType
> {
  constructor() {
    super('me/address')
  }
}
