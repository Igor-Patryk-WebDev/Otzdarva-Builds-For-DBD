import z from "zod";

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),

  GITHUB_OWNER: z.string(),
  GITHUB_REPO: z.string(),
  GITHUB_PAT: z.string(),
  GITHUB_EVENT_TYPE: z.string()
})

export const env = envSchema.safeParse(import.meta.env)