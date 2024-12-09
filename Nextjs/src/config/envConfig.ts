import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  DELAY_FORM: z.number(),
  DELAY_FETCH: z.number(),
  DELAY_COOKIE: z.number(),
  IMAGE_PREFIX_URL: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PASSWORD: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  DELAY_FORM: Number(process.env.NEXT_PUBLIC_DELAY_FORM),
  DELAY_FETCH: Number(process.env.NEXT_PUBLIC_DELAY_FETCH),
  DELAY_COOKIE: Number(process.env.NEXT_PUBLIC_DELAY_COOKIE) || 10,
  IMAGE_PREFIX_URL: process.env.NEXT_PUBLIC_IMAGE_PREFIX_URL,
  ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
})

if (configProject.error) {
  console.log(configProject.error)
  throw new Error('Một vài biến môi trường không hợp lệ!')
}

const envConfig = configProject.data

export default envConfig
