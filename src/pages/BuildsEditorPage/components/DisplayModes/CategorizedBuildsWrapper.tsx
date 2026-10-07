import type { ProfileBuild } from "@/types/profiles.types"
import { EditableBuildsWrapper } from "../EditableBuildsWrapper"
import { ProfilesWrapper } from "@/components/ProfilesWrapper"
import { useSelectedRole } from "@/hooks/stores/useGlobalAppStore"
import { useProfiles } from "@/contexts/AppDataContext"

type CategorizedBuildsWrapperProps = {
  searchQuery: string
  perkQuery: string
}

function buildMatchesPerk(build: ProfileBuild, lowercasePerkQuery: string): boolean {
  return build.perks.some(
    (perk) =>
      perk.name.toLowerCase().includes(lowercasePerkQuery) ||
      perk.alts.some((alt) => alt.name.toLowerCase().includes(lowercasePerkQuery))
  )
}

export const CategorizedBuildsWrapper = ({ searchQuery, perkQuery }: CategorizedBuildsWrapperProps) => {
  const selectedRole = useSelectedRole() ?? "killers";
  const profiles = useProfiles();

  const lowercasePerkQuery = perkQuery.trim().toLowerCase();

  if (lowercasePerkQuery) {
    const roleProfiles = profiles[selectedRole];
    const lowercaseCharQuery = searchQuery.trim().toLowerCase();

    const matchingProfiles = roleProfiles
      .filter((profile) =>
        !lowercaseCharQuery || profile.name.toLowerCase().includes(lowercaseCharQuery)
      )
      .map((profile) => ({
        profile,
        filteredBuilds: (profile.builds ?? []).filter((build) =>
          buildMatchesPerk(build, lowercasePerkQuery)
        ),
      }))
      .filter(({ filteredBuilds }) => filteredBuilds.length > 0);

    return (
      <div className="flex flex-col gap-8">
        {matchingProfiles.map(({ profile, filteredBuilds }) => (
          <EditableBuildsWrapper
            key={profile.name}
            profile={profile}
            filteredBuilds={filteredBuilds}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <ProfilesWrapper role={selectedRole} searchQuery={searchQuery}>
        {(profile) => (
          <EditableBuildsWrapper profile={profile} />
        )}
      </ProfilesWrapper>
    </div>
  )
}