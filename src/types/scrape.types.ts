import type z from "zod";
import type {
  characterSchema,
  scrapeSchema,
  scrapeMetaSchema,
  perkSchema,
  roleSchema
} from "@schemas/scrape.schema";

export type OtherData = z.infer<typeof scrapeMetaSchema>

export type Character = z.infer<typeof characterSchema>

export type Perk = z.infer<typeof perkSchema>

export type RoleData = z.infer<typeof roleSchema>

export type ScrapeData = z.infer<typeof scrapeSchema>
