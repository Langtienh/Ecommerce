import http from '@/lib/http'

import { z } from 'zod'
import { nameSchema, phoneSchema } from './authen/schema'
import { getOptionWithAccessToken } from './client-server'
import { User } from './user-request-api'

export const UpdateMeSchema = z.object({
  name: nameSchema,
  phone: phoneSchema
})

export type UpdateMeBodyType = z.infer<typeof UpdateMeSchema>

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
