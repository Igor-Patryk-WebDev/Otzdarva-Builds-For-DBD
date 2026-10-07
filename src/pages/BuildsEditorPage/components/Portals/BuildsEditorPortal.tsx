import {
  useBuildsEditorPortalState,
  useBuildsEditorPortalActions,
} from "@/hooks/stores/BuildsEditorStores/useBuildsEditorPortalStore";
import { DrawerPortalWrapper } from "@/components/DrawerPortalWrapper";
import { BuildsEditor } from "../BuildsEditor";

type BuildsPortalWrapperProps = {}

export const BuildsEditorPortal = ({ }: BuildsPortalWrapperProps) => {
  const isBuildsEditorPortalOpen = useBuildsEditorPortalState();
  const { closeBuildsEditorPortal } = useBuildsEditorPortalActions();

  return (
    <DrawerPortalWrapper portalState={isBuildsEditorPortalOpen} closePortal={closeBuildsEditorPortal}>
      <BuildsEditor />
    </DrawerPortalWrapper>
  );
};
