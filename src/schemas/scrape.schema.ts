import z from "zod";

export const scrapeMetaSchema = z.object({
  scrapeRequestUNIX: z.number()
});

export const characterSchema = z.object({
  name: z.string(),
  portraitUrl: z.string()
});

export const perkSchema = z.object({
  name: z.string(),
  iconUrl: z.string(),
  description: z.string(),
  obtainment: z.string()
});

export const roleSchema = z.object({
  perks: z.array(perkSchema),
  characters: z.array(characterSchema),
  profiles: z.array(characterSchema)
});

export const scrapeSchema = z.object({
  killers: roleSchema,
  survivors: roleSchema,
  other: scrapeMetaSchema
});
