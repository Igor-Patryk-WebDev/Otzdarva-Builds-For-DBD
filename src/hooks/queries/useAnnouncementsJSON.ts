import type { AnnouncementsData } from "@appTypes/announcements.types";

import { announcementsSchema } from "@schemas/announcements.schema";
import { useQuery } from "@tanstack/react-query";

export const useAnnouncementsJSON = () => {
  return useQuery<AnnouncementsData>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await fetch("/data/announcements.json", { cache: "no-store" });
      return announcementsSchema.parse(await res.json());
    }
  });
};
