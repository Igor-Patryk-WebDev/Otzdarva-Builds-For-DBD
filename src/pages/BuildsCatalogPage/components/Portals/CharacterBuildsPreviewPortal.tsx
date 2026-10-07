import { useProfileBuildsPortalActions, useProfileBuildsPortalSelectedProfile, useProfileBuildsPortalState } from "@/hooks/stores/useCharacterBuildsPortalStore";
// import { useGlobalAppActions, useIsTopMostModal } from "@hooks/stores/useGlobalAppStore";
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

  // const modalId = "profile-builds-modal";
  // const isTopMost = useIsTopMostModal(modalId);

  // useEffect(() => {
  //   registerModal(modalId);
  //   return () => removeModal(modalId);
  // }, [modalId, registerModal, removeModal]);

  // useHotkey("Escape", () => {
  //   if (!isTopMost) return;

  // })

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