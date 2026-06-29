import { useBuildEditorPortalState, useBuildEditorPortalContent } from "@contexts/BuildEditor/BuildEditorPortalContext";
import { PortalWrapper } from "@components/shared/PortalWrapper";

interface BuildsPortalWrapperProps {
  parent?: HTMLElement
}

export const EditorPortal = ({ parent }: BuildsPortalWrapperProps) => {
  const { buildEditorPortalState } = useBuildEditorPortalState();
  const { buildEditorPortalContent } = useBuildEditorPortalContent();

  return (
    <PortalWrapper portalState={buildEditorPortalState} parent={parent}>
      {buildEditorPortalContent}
    </PortalWrapper>
  )
}