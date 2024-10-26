'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export const serverRevalidateTag = async (tag: string) => {
  revalidateTag(tag)
}

export const serverRevalidatePath = async (path: string) => {
  revalidatePath(path)
}
