import { createContext, useContext, useState, type ReactNode } from "react";

interface PortalContextProps {
  buildsPortalState: boolean
  buildsPortalContent: ReactNode
  handleOpenBuildsPortal: () => void
  handleCloseBuildsPortal: () => void
  handleBuildsPortalContent: (content: ReactNode) => void
}

interface PortalProviderProps {
  children: ReactNode
}

const BuildsPortalContext = createContext<PortalContextProps>(undefined!);

export const useBuildsPortalState = () => {
  const { buildsPortalState } = useContext(BuildsPortalContext);
  return buildsPortalState;
}

export const useOpenBuildsPortal = () => {
  const { handleOpenBuildsPortal } = useContext(BuildsPortalContext);
  return handleOpenBuildsPortal;
}

export const useCloseBuildsPortal = () => {
  const { handleCloseBuildsPortal } = useContext(BuildsPortalContext);
  return handleCloseBuildsPortal;
}

export const useBuildsPortalContent = () => {
  const { buildsPortalContent, handleBuildsPortalContent } = useContext(BuildsPortalContext);
  return { buildsPortalContent, setBuildsPortalContent: handleBuildsPortalContent }
}

export const BuildsPortalProvider = ({ children }: PortalProviderProps) => {
  const [buildsPortalState, setBuildsPortalState] = useState<boolean>(false);
  const [buildsPortalContent, setBuildsPortalContent] = useState<ReactNode>(null);

  const handleOpenBuildsPortal = () => {
    setBuildsPortalState(true);
    document.body.style.overflow = "clip";
  }

  const handleCloseBuildsPortal = () => {
    setBuildsPortalState(false);
    document.body.style.overflow = "auto";
  }

  const handleBuildsPortalContent = (content: ReactNode) => {
    setBuildsPortalContent(content);
  }

  return (
    <BuildsPortalContext value={{ buildsPortalState, buildsPortalContent, handleOpenBuildsPortal, handleCloseBuildsPortal, handleBuildsPortalContent }}>
      {children}
    </BuildsPortalContext>
  )
}