import type z from "zod";
import type {
  buildGroupSchema,
  altPerkSchema,
  buildsSchema,
  perkSchema,
  roleSchema
} from "@schemas/builds.schema";

export type Alt = z.infer<typeof altPerkSchema>

export type Perk = z.infer<typeof perkSchema>

export type Build = z.infer<typeof buildGroupSchema>

export type BuildsProfile = z.infer<typeof roleSchema>

export type BuildsData = z.infer<typeof buildsSchema>
