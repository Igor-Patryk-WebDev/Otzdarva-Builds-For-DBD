import type { ScrapeData } from "@appTypes/Scrape";

import { useQuery } from "@tanstack/react-query";

export const useScrapeJSON = () => {
  return useQuery<ScrapeData>({
    queryKey: ["wikiScrape"],
    queryFn: async () => {
      const res = await fetch("/data/scrape.json");
      return res.json();
    },
    gcTime: 0
  });
};