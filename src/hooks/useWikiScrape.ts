import { useQuery } from "@tanstack/react-query";

export const useWikiScrape = () => {
  return useQuery({
    queryKey: ["wikiScrape"],
    queryFn: async () => {
      const res = await fetch("/data/wiki_scrape.json");
      return res.json();
    },
  });
};