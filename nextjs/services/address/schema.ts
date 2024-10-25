import { z } from 'zod'

export const addressSchema = z.object({
  city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  ward: z.string().min(1, 'Vui lòng chọn phường/xã'),
  detail: z.string().min(1, 'Vui lòng nhập địa chỉ chi tiết')
})

export type AddressBodyType = z.infer<typeof addressSchema>
