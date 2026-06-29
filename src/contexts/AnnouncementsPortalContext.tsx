import {
  type ReactNode,
  useState, createContext, useContext,
  type Dispatch,
  type SetStateAction
} from "react"

type AnnouncementsPortalContextType = {
  announcementsPortalState: boolean
  openAnnouncementsPortal: () => void
  closeAnnouncementsPortal: () => void

  announcementsPortalContent: ReactNode
  setAnnouncementsPortalContent: Dispatch<SetStateAction<ReactNode>>
}

type AppDataProviderProps = {
  children: ReactNode
}

const AnnouncementsPortalContext = createContext<AnnouncementsPortalContextType>(undefined!)

export const useAnnouncementsPortalState = () => {
  const { announcementsPortalState, openAnnouncementsPortal, closeAnnouncementsPortal } = useContext(AnnouncementsPortalContext);
  return { announcementsPortalState, openAnnouncementsPortal, closeAnnouncementsPortal }
}

export const useAnnouncementsPortalContent = () => {
  const { announcementsPortalContent, setAnnouncementsPortalContent } = useContext(AnnouncementsPortalContext);
  return { announcementsPortalContent, setAnnouncementsPortalContent }
}

export const AnnouncementsPortalProvider = ({ children }: AppDataProviderProps) => {
  const [announcementsPortalState, setAnnouncementsPortalState] = useState(false);
  const [announcementsPortalContent, setAnnouncementsPortalContent] = useState<ReactNode>(null);

  const openAnnouncementsPortal = () => {
    setAnnouncementsPortalState(true);
    document.body.style.overflow = "clip";
  }

  const closeAnnouncementsPortal = () => {
    setAnnouncementsPortalState(false);
    document.body.style.overflow = "auto";
  }

  return (
    <AnnouncementsPortalContext value={{ announcementsPortalState, openAnnouncementsPortal, closeAnnouncementsPortal, announcementsPortalContent, setAnnouncementsPortalContent }}>
      {children}
    </AnnouncementsPortalContext>
  )
}