import { PortalWrapper } from "@components/shared/PortalWrapper";
import { useProfiles } from "@contexts/AppDataContext";
import { useProfileBuildsPortalContent, useProfileBuildsPortalState } from "@hooks/stores/useProfileBuildsPortalStore";

interface ProfileBuildsPortalProps {
  parent?: HTMLElement
}

export const ProfileBuildsPortal = ({ parent }: ProfileBuildsPortalProps) => {
  const profileBuildsPortalState = useProfileBuildsPortalState();
  const profileBuildsPortalContent = useProfileBuildsPortalContent();
  const profiles = useProfiles();

  return (
    <PortalWrapper portalState={profileBuildsPortalState} parent={parent}>
      {profileBuildsPortalContent && profileBuildsPortalContent(profiles)}
    </PortalWrapper>
  )
}