import type { Announcements } from "@appTypes/Announcements";
import { useQuery } from "@tanstack/react-query";

export const useAnnouncementsJSON = () => {
  return useQuery<Announcements>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await fetch("/data/announcements.json");
      return res.json();
    },
  });
};
