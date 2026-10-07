import type { ProfilesData, DbdRole } from "@/types/profiles.types";
import type { BuildsData } from "@/types/builds.types";
import type { ScrapeData } from "@/types/scrape.types";

type UseCustomProfiles = {
  builds: BuildsData,
  scrape: ScrapeData
}

export const useCustomProfiles = ({ builds, scrape }: UseCustomProfiles) => {

  const handleCustomProfile = (role: DbdRole) => {

    const findPerk = (target: string) => {
      return scrape[role].perks.find((p) => p.name === target)?.iconUrl
    }

    return (
      scrape[role].profiles.map((profile) => ({
        name: profile.name,
        role: role,
        portraitUrl: profile.portraitUrl,
        builds: builds[role]?.find((p) => p.name === profile.name)?.builds?.map((build) => ({
          name: build.name,
          perks: build.perks.map((perk) => ({
            name: perk.name,
            iconUrl: findPerk(perk.name) ?? undefined,
            description: scrape[role]?.perks.find((p) => p.name === perk.name)?.description,
            obtainment: scrape[role]?.perks.find((p) => p.name === perk.name)?.obtainment,
            alts: perk.alts.map((alt) => ({
              name: alt.name,
              iconUrl: findPerk(alt.name) ?? undefined,
              description: scrape[role]?.perks.find((p) => p.name === alt.name)?.description,
              obtainment: scrape[role]?.perks.find((p) => p.name === alt.name)?.obtainment,
            }))
          })),
          notes: build.notes
        })) ?? undefined
      }))
    )
  }

  const profiles: ProfilesData = {
    killers: handleCustomProfile("killers"),
    survivors: handleCustomProfile("survivors")
  }

  return profiles
}