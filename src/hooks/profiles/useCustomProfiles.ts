import type { DbdRole } from "@appTypes/DbdRole";
import type { ProfilesData } from "@appTypes/Profiles";

import { useBuildsJSON } from "@hooks/queries/useBuildsJSON";
import { useScrapeJSON } from "@hooks/queries/useScrapeJSON";

export const useCustomProfiles = () => {
  const { data: builds, isLoading: buildsLoading } = useBuildsJSON();
  const { data: scrape, isLoading: scrapeLoading } = useScrapeJSON();

  const profilesLoading = buildsLoading || scrapeLoading

  const handleCustomProfile = (role: DbdRole) => {
    if (!builds || !scrape) return undefined

    const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>;
    return (
      builds[lowercaseRole].map((profile) => ({
        name: profile.name,
        portraitUrl: scrape[lowercaseRole].roleProfiles.find((p) => p.name === profile.name)?.portraitUrl,
        builds: profile.builds.map((build) => ({
          name: build.name,
          perks: build.perks.map((perk) => ({
            name: perk.name,
            iconUrl: scrape[lowercaseRole].perks.find((p) => p.name === perk.name)?.iconUrl,
            alts: perk.alts.map((alt) => ({
              name: alt.name,
              iconUrl: scrape[lowercaseRole].perks.find((p) => p.name === alt.name)?.iconUrl,
            }))
          })),
          notes: build.notes
        }))
      }))
    )
  }

  const profiles: ProfilesData = {
    killers: handleCustomProfile("Killers"),
    survivors: handleCustomProfile("Survivors")
  }

  return { data: profiles, isLoading: profilesLoading }
}