import type { ScrapeData } from "@/types/scrape.types";

import { scrapeSchema } from "@/schemas/scrape.schema";
import { useQuery } from "@tanstack/react-query";

export const useScrapeJSON = () => {
  return useQuery<ScrapeData>({
    queryKey: ["wikiScrape"],
    queryFn: async () => {
      const res = await fetch("/data/scrape.json", { cache: "no-store" });
      return scrapeSchema.parse(await res.json());
    }
  });
};
