import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState, createContext, useContext
} from "react";

type PerkDetailsPortalContextType = {
  perkDetailsPortalState: boolean
  openPerkDetailsPortal: () => void
  closePerkDetailsPortal: () => void
  perkDetailsPortalContent: ReactNode
  setPerkDetailsPortalContent: Dispatch<SetStateAction<ReactNode>>
}

type PerkDetailsPortalContextProps = {
  children: ReactNode
}

const PerkDetailsPortalContext = createContext<PerkDetailsPortalContextType>(undefined!);

export const usePerkDetailsPortalState = () => {
  const { perkDetailsPortalState, openPerkDetailsPortal, closePerkDetailsPortal } = useContext(PerkDetailsPortalContext);
  return { perkDetailsPortalState, openPerkDetailsPortal, closePerkDetailsPortal }
}

export const usePerkDetailsPortalContent = () => {
  const { perkDetailsPortalContent, setPerkDetailsPortalContent } = useContext(PerkDetailsPortalContext);
  return { perkDetailsPortalContent, setPerkDetailsPortalContent }
}

export const PerkDetailsPortalProvider = ({ children }: PerkDetailsPortalContextProps) => {
  const [perkDetailsPortalState, setPerkDetailsPortalState] = useState(false);
  const [perkDetailsPortalContent, setPerkDetailsPortalContent] = useState<ReactNode>(null);

  const openPerkDetailsPortal = () => {
    setPerkDetailsPortalState(true);
  }

  const closePerkDetailsPortal = () => {
    setPerkDetailsPortalState(false);
  }

  return (
    <PerkDetailsPortalContext value={{ perkDetailsPortalState, openPerkDetailsPortal, closePerkDetailsPortal, perkDetailsPortalContent, setPerkDetailsPortalContent }}>
      {children}
    </PerkDetailsPortalContext>
  )
}