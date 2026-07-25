import { PortalWrapper } from "@components/shared/PortalWrapper";
import { useBuildEditorPortalContent, useBuildEditorPortalState } from "@hooks/stores/useBuildEditorPortalStore";

interface BuildsPortalWrapperProps {
  parent?: HTMLElement
}

export const EditorPortal = ({ parent }: BuildsPortalWrapperProps) => {
  const buildEditorPortalState = useBuildEditorPortalState();
  const buildEditorPortalContent = useBuildEditorPortalContent();

  return (
    <PortalWrapper portalState={buildEditorPortalState} parent={parent}>
      {buildEditorPortalContent}
    </PortalWrapper>
  )
}