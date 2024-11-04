import http from '@/lib/http'

import { z } from 'zod'
import { nameSchema, phoneSchema } from './auth-request-api'
import { cookiesService } from './core/cookie-services'
import { User } from './user-request-api'

const { getOptionWithAccessToken } = cookiesService
export const UpdateMeSchema = z.object({
  name: nameSchema,
  phone: phoneSchema
})

export type UpdateMeBodyType = z.infer<typeof UpdateMeSchema>

export const addressSchema = z.object({
  city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  ward: z.string().min(1, 'Vui lòng chọn phường/xã'),
  detail: z.string().min(1, 'Vui lòng nhập địa chỉ chi tiết')
})

export type AddressBodyType = z.infer<typeof addressSchema>

const meRequestApi = {
  getMe: async () => {
    const option = await getOptionWithAccessToken()
    const res = await http.get<User>('/me', option)
    return res
  },
  updateMe: async (data: UpdateMeBodyType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.patch<User>('/me', data, option)
    return res
  }
}
export default meRequestApi
