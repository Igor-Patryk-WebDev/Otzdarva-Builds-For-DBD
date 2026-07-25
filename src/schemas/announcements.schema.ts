import z from "zod";

export const alertSchema = z.object({
  id: z.string(),
  title: z.string(),
  desc: z.string(),
  threatLevel: z.number().min(0).max(2),
  expiresAt: z.number().nullable(),
  createdAt: z.string()
})

export const announcementsSchema = z.object({
  alerts: z.array(alertSchema),
  threatLevelsStyles: z.array(z.string())
})
