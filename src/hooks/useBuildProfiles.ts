import type { DbdRole } from "@appTypes/DbdRole";
import type { RoleProfile } from "@appTypes/Scrape";
import type { BuildsProfile } from "@appTypes/Builds";

import { useBuilds, useScrape } from "@contexts/AppDataContext";

interface UseCharacterProfilesProps {
  role: DbdRole
}

export const useBuildProfiles = ({ role }: UseCharacterProfilesProps) => {
  const lowercaseRole = role.toLowerCase();
  const builds = useBuilds();
  const scrape = useScrape();

  const profiles: RoleProfile[] = scrape[lowercaseRole].roleProfiles
  const buildProfiles: BuildsProfile[] = builds[lowercaseRole]

  const newProfiles = profiles?.map((profile) => ({
    ...profile,
    builds: buildProfiles?.find((b) => b.name === profile.name)?.builds ?? []
  }))

  return {
    profiles: newProfiles,
  }
}