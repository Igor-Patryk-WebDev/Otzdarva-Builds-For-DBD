import type { BuildsData } from "@appTypes/Builds";
import type { DbdRole } from "@appTypes/DbdRole";
import type { ProfilesData } from "@appTypes/Profiles";
import type { ScrapeData } from "@appTypes/Scrape";

interface UseCustomProfiles {
  builds: BuildsData,
  scrape: ScrapeData
}

export const useCustomProfiles = ({ builds, scrape }: UseCustomProfiles) => {

  const handleCustomProfile = (role: DbdRole) => {
    const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>;

    const findPerk = (target: string) => {
      return scrape[lowercaseRole].perks.find((p) => p.name === target)?.iconUrl
    }

    return (
      scrape[lowercaseRole].roleProfiles.map((profile) => ({
        name: profile.name,
        portraitUrl: profile.portraitUrl,
        builds: builds[lowercaseRole].find((p) => p.name === profile.name)?.builds.map((build) => ({
          name: build.name,
          perks: build.perks.map((perk) => ({
            name: perk.name,
            iconUrl: findPerk(perk.name) ?? null,
            alts: perk.alts.map((alt) => ({
              name: alt.name,
              iconUrl: findPerk(alt.name) ?? null,
            }))
          })),
          notes: build.notes
        })) ?? null
      }))
    )
  }

  const profiles: ProfilesData = {
    killers: handleCustomProfile("Killers"),
    survivors: handleCustomProfile("Survivors")
  }

  return profiles
}