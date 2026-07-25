import z from "zod";

export const altPerkSchema = z.object({
  name: z.string()
});

export const perkSchema = z.object({
  name: z.string(),
  alts: z.array(altPerkSchema)
});

export const buildGroupSchema = z.object({
  name: z.string(),
  perks: z.array(perkSchema),
  notes: z.array(z.string())
});

export const roleSchema = z.object({
  name: z.string(),
  builds: z.union([z.array(buildGroupSchema), z.undefined()])
});

export const buildsSchema = z.object({
  killers: z.array(roleSchema),
  survivors: z.array(roleSchema)
});
