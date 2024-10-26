import { z } from 'zod'

export const AddResourceSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  description: z.string({ message: 'Mô tả không được để trống' })
})

export type AddResourceType = z.infer<typeof AddResourceSchema>
