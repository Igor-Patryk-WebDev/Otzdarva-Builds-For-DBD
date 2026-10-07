import { useBuildExtendedViewPortalActions, useBuildExtendedViewPortalSelectedBuild, useBuildExtendedViewPortalSelectedProfile, useBuildExtendedViewPortalState } from "@/hooks/stores/useBuildExpandedViewPortalStore"
import { DrawerPortalWrapper } from "@/components/DrawerPortalWrapper"
import { BuildExpandedView } from "../ProfilePanel/BuildExpandedView"

type BuildExpandedViewPortalProps = {}

export const BuildExpandedViewPortal = ({ }: BuildExpandedViewPortalProps) => {
  const isOpen = useBuildExtendedViewPortalState();
  const { closeBuildExtendedViewPortal } = useBuildExtendedViewPortalActions();

  const selectedBuild = useBuildExtendedViewPortalSelectedBuild();
  const selectedProfile = useBuildExtendedViewPortalSelectedProfile();

  if (!selectedBuild || !selectedProfile) return null

  return (
    <DrawerPortalWrapper portalState={isOpen} closePortal={closeBuildExtendedViewPortal}>
      <BuildExpandedView build={selectedBuild} profile={selectedProfile} />
    </DrawerPortalWrapper>
  )
}