import { getOptionWithAccessToken } from '@/lib/action'
import { http } from '@/lib/http'
import { User } from '../user'
import { AddressRequest } from './address.request'
import { UpdateMeBodyType } from './me.schema'

export class MeRequest {
  address: AddressRequest
  constructor() {
    this.address = new AddressRequest()
  }
  async get() {
    const option = await getOptionWithAccessToken()
    const res = await http.get<User>('/me', option)
    return res
  }

  async update(data: UpdateMeBodyType) {
    const option = await getOptionWithAccessToken()
    const res = await http.patch<User>('/me', data, option)
    return res
  }
}

export const meRequest = new MeRequest()
