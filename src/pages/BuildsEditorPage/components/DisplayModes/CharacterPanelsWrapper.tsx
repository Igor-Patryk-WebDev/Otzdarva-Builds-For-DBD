import { ProfilesWrapper } from "@/components/ProfilesWrapper"
import { CharacterProfileBlock } from "../CharacterProfileBlock"
import { useSelectedRole } from "@/hooks/stores/useGlobalAppStore"

type CharacterPanelsWrapperProps = {
  searchQuery: string
}

export const CharacterPanelsWrapper = ({ searchQuery }: CharacterPanelsWrapperProps) => {
  const selectedRole = useSelectedRole() ?? "killers";

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-items-center gap-y-16 px-32 gap-x-8">
      <ProfilesWrapper role={selectedRole} searchQuery={searchQuery}>
        {(profile) =>
          <CharacterProfileBlock profile={profile} />
        }
      </ProfilesWrapper>
    </div>
  )
}