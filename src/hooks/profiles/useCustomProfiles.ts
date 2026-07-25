import type { ProfilesData, DbdRole } from "@appTypes/profiles.types";
import type { BuildsData } from "@appTypes/builds.types";
import type { ScrapeData } from "@appTypes/scrape.types";

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
      scrape[lowercaseRole].profiles.map((profile) => ({
        name: profile.name,
        role: lowercaseRole,
        portraitUrl: profile.portraitUrl,
        builds: builds[lowercaseRole]?.find((p) => p.name === profile.name)?.builds?.map((build) => ({
          name: build.name,
          perks: build.perks.map((perk) => ({
            name: perk.name,
            iconUrl: findPerk(perk.name) ?? undefined,
            description: scrape[lowercaseRole]?.perks.find((p) => p.name === perk.name)?.description,
            obtainment: scrape[lowercaseRole]?.perks.find((p) => p.name === perk.name)?.obtainment,
            alts: perk.alts.map((alt) => ({
              name: alt.name,
              iconUrl: findPerk(alt.name) ?? undefined,
              description: scrape[lowercaseRole]?.perks.find((p) => p.name === alt.name)?.description,
              obtainment: scrape[lowercaseRole]?.perks.find((p) => p.name === alt.name)?.obtainment,
            }))
          })),
          notes: build.notes
        })) ?? undefined
      }))
    )
  }

  const profiles: ProfilesData = {
    killers: handleCustomProfile("Killers"),
    survivors: handleCustomProfile("Survivors")
  }

  return profiles
}