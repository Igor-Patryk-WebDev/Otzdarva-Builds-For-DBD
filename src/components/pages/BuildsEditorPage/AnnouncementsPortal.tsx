import { useAnnouncementsPortalState } from "@contexts/AnnouncementsPortalContext";
import { AnnouncementsEditor } from "./AnnouncementsEditor";
import { PortalWrapper } from "@components/shared/PortalWrapper";

interface AnnouncementsPortalProps {
  parent?: HTMLElement
}

export const AnnouncementsPortal = ({ parent }: AnnouncementsPortalProps) => {
  const { announcementsPortalState } = useAnnouncementsPortalState();

  return (
    <PortalWrapper portalState={announcementsPortalState} parent={parent}>
      <AnnouncementsEditor />
    </PortalWrapper>
  )
}