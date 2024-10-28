import http from '@/lib/http'
import authenRequestApi from '../authen/authen-request'
import { UpdateMeBodyType } from '../authen/schema'

const meRequestApi = {
  getMe: async () => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.get<User>('/me', option)
    return res
  },
  updateMe: async (data: UpdateMeBodyType) => {
    const option = await authenRequestApi.getOptionWithAccessToken()
    const res = await http.patch<User>('/me', data, option)
    return res
  }
}
export default meRequestApi
