import { useProfileBuildsPortalActions, useProfileBuildsPortalSelectedProfile, useProfileBuildsPortalState } from "@/hooks/stores/useCharacterBuildsPortalStore";
import { ProfileBuildsWrapper } from "../ProfilePanel/ProfileBuildsWrapper";
import { DrawerPortalWrapper } from "@/components/DrawerPortalWrapper";
import { useProfiles } from "@/contexts/AppDataContext";
import { BuildPanel } from "../../../../components/BuildPanel";

type ProfileBuildsPortalProps = {}

export const ProfileBuildsPortal = ({ }: ProfileBuildsPortalProps) => {
  // const { registerModal, removeModal } = useGlobalAppActions();

  const isOpen = useProfileBuildsPortalState();
  const { closeProfileBuildsPortal } = useProfileBuildsPortalActions();

  const profiles = useProfiles();

  const selectedProfile = useProfileBuildsPortalSelectedProfile();
  if (!selectedProfile) return null

  const currentProfile = profiles[selectedProfile.role]?.find((profile) => profile.name === selectedProfile.name);
  if (!currentProfile) return null

  const buildsCount = currentProfile.builds?.length ?? 0

  return (
    <DrawerPortalWrapper portalState={isOpen} closePortal={closeProfileBuildsPortal}>
      <ProfileBuildsWrapper name={currentProfile.name} buildsCount={buildsCount}>
        {currentProfile.builds?.map((build) => (
          <BuildPanel key={build.name} build={build} profile={currentProfile} />
        ))}
      </ProfileBuildsWrapper>
    </DrawerPortalWrapper>
  )
}