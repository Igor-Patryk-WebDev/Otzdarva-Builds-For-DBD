import type { BuildsProfile } from "@appTypes/Builds";
import type { DbdRole } from "@appTypes/DbdRole"

import { useScrape } from "@contexts/AppDataContext";

interface UseCharactersFromScrapeProps {
  role: DbdRole
}

export const useCharactersFromScrape = ({ role }: UseCharactersFromScrapeProps) => {
  const lowercaseRole = role.toLowerCase();
  const scrape = useScrape();

  return {
    characters: scrape[lowercaseRole] as BuildsProfile[],
  }
}