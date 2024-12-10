import { z } from 'zod'
import { User } from '../user'

export interface Resource {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  creatorId: number
  updaterId: number
}

export interface ResourceDetail extends Resource {
  creator: User
  updater: User
}

export const AddResourceSchema = z.object({
  name: z.string({ message: 'Tên không được để trống' }),
  description: z.string({ message: 'Mô tả không được để trống' })
})
export const UpdateResourceSchema = AddResourceSchema.partial()
export type AddResourceType = z.infer<typeof AddResourceSchema>
export type UpdateResourceType = z.infer<typeof UpdateResourceSchema>
