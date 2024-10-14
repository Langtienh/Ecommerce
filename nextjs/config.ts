import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  DELAY_FORM: z.number(),
  DELAY_FETCH: z.number()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  DELAY_FORM: Number(process.env.NEXT_PUBLIC_DELAY_FORM),
  DELAY_FETCH: Number(process.env.NEXT_PUBLIC_DELAY_FETCH)
})

if (configProject.error) {
  console.log(configProject.error)
  throw new Error('Một vài biến môi trường không hợp lệ!')
}

const envConfig = configProject.data

export default envConfig
