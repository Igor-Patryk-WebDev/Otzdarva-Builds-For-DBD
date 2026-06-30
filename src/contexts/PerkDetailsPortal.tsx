import { usePerkDetailsPortalContent } from "./PerkDetailsPortalContext"
import { createPortal } from "react-dom"

type PerkDetailsPortalProps = {
  parent?: HTMLElement
}

export const PerkDetailsPortal = ({ parent }: PerkDetailsPortalProps) => {
  const { perkDetailsPortalContent } = usePerkDetailsPortalContent();
  return createPortal(
    <div className="absolute sm:custom-anchor z-1000000">
      {perkDetailsPortalContent}
    </div>,
    parent ?? document.body
  );
};