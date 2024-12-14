import { z } from 'zod'
import { nameSchema, phoneSchema } from '../user'

export const UpdateMeSchema = z.object({
  name: nameSchema,
  phone: phoneSchema
})

export type UpdateMeBodyType = z.infer<typeof UpdateMeSchema>

export type Address = {
  id: number
  type: string
  name: string
  address: string
  detail: string
  isDefault: boolean
  userId: number
}
export const addressSchema = z.object({
  city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  ward: z.string().min(1, 'Vui lòng chọn phường/xã'),
  detail: z.string().min(1, 'Vui lòng nhập địa chỉ chi tiết')
})

export type AddressBodyType = z.infer<typeof addressSchema>
