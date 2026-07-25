import type z from "zod";
import type {
  announcementsSchema,
  alertSchema
} from "@schemas/announcements.schema";

export type Alert = z.infer<typeof alertSchema>

export type AnnouncementsData = z.infer<typeof announcementsSchema>
