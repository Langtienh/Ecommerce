import http from '@/lib/http'
import { AddressBodyType } from '@/services/address/schema'

export const createAddress = async (body: AddressBodyType) => {
  return await http.post('/address', body)
}
