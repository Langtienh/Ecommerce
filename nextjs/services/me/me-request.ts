import http from '@/lib/http'
import { UpdateMeBodyType } from '../authen/schema'
import { getOptionWithAccessToken } from '../cookies/auth-cookie'

const meRequestApi = {
  getMe: async () => {
    const option = await getOptionWithAccessToken()
    const res = await http.get<User>('/me', option)
    return res
  },
  updateMe: async (data: UpdateMeBodyType) => {
    const option = await getOptionWithAccessToken()
    const res = await http.put<User>('/me', data, option)
    return res
  }
}
export default meRequestApi
