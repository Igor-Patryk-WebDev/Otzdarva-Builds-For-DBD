import type { DbdRole, ProfileAlt, ProfilePerk } from "@/types/profiles.types"

type BuildExpandedViewMainPerkDetailsProps = {
  role: DbdRole
  perk: ProfilePerk | ProfileAlt
}

export const BuildExpandedViewMainPerkDetails = ({ role, perk }: BuildExpandedViewMainPerkDetailsProps) => {
  return (
    <div className="flex items-center">
      <div>
        <h3 className="text-lg sm:text-xl font-bold">{perk.name}</h3>
        <p className="text-sm sm:text-base text-neutral-500">
          {role === "killers" && perk.obtainment !== "Bloodweb" ? `The ${perk.obtainment}` : perk.obtainment}
        </p>
      </div>
    </div>
  )
}