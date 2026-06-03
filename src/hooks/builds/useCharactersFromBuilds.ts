import type { BuildsProfile } from "@appTypes/Builds";
import type { DbdRole } from "@appTypes/DbdRole";

import { useBuilds } from "@contexts/AppDataContext";

interface UseCharactersFromBuildsProps {
  role: DbdRole
}

export const useCharactersFromBuilds = ({ role }: UseCharactersFromBuildsProps) => {
  const lowercaseRole = role.toLowerCase();
  const builds = useBuilds();

  return {
    characters: builds[lowercaseRole] as BuildsProfile[],
  };
};