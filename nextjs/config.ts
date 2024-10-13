import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (configProject.error) {
  console.log(configProject.error);
  throw new Error("Một vài biến môi trường không hợp lệ!");
}

const envConfig = configProject.data;

export default envConfig;
