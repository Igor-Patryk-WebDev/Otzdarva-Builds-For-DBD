import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useState, createContext, useContext
} from "react";
import type { ProfilesData } from "@appTypes/Profiles";

type ProfileBuildsPortalContentFn = (profiles: ProfilesData) => ReactNode;

type ProfileBuildsPortalContextType = {
  profileBuildsPortalState: boolean
  openProfileBuildsPortal: () => void
  closeProfileBuildsPortal: () => void

  profileBuildsPortalContent: ProfileBuildsPortalContentFn | null
  setProfileBuildsPortalContent: Dispatch<SetStateAction<ProfileBuildsPortalContentFn | null>>
}

type ProfileBuildsPortalProviderProps = {
  children: ReactNode
}

const ProfileBuildsPortalContext = createContext<ProfileBuildsPortalContextType>(undefined!);

export const useProfileBuildsPortalState = () => {
  const { profileBuildsPortalState, openProfileBuildsPortal, closeProfileBuildsPortal } = useContext(ProfileBuildsPortalContext);
  return { profileBuildsPortalState, openProfileBuildsPortal, closeProfileBuildsPortal };
}

export const useProfileBuildsPortalContent = () => {
  const { profileBuildsPortalContent, setProfileBuildsPortalContent } = useContext(ProfileBuildsPortalContext);
  return { profileBuildsPortalContent, setProfileBuildsPortalContent }
}

export const ProfileBuildsPortalProvider = ({ children }: ProfileBuildsPortalProviderProps) => {
  const [profileBuildsPortalState, setProfileBuildsPortalState] = useState(false);
  const [profileBuildsPortalContent, setProfileBuildsPortalContent] = useState<ProfileBuildsPortalContentFn | null>(null);

  const openProfileBuildsPortal = () => {
    setProfileBuildsPortalState(true);
    document.body.style.overflow = "clip";
  }

  const closeProfileBuildsPortal = () => {
    setProfileBuildsPortalState(false);
    document.body.style.overflow = "auto";
  }

  return (
    <ProfileBuildsPortalContext value={{ profileBuildsPortalState, openProfileBuildsPortal, closeProfileBuildsPortal, profileBuildsPortalContent, setProfileBuildsPortalContent }}>
      {children}
    </ProfileBuildsPortalContext>
  )
}