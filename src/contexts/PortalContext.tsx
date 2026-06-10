import { createContext, useContext, useState, type ReactNode } from "react";

interface PortalContextProps {
  portalState: boolean
  portalContent: ReactNode
  handleOpenPortal: () => void
  handleClosePortal: () => void
  handlePortalContent: (content: ReactNode) => void
}

interface PortalProviderProps {
  children: ReactNode
}

const PortalContext = createContext<PortalContextProps>(undefined!);

export const usePortalState = () => {
  const { portalState } = useContext(PortalContext);
  return portalState;
}

export const useOpenPortal = () => {
  const { handleOpenPortal } = useContext(PortalContext);
  return handleOpenPortal;
}

export const useClosePortal = () => {
  const { handleClosePortal } = useContext(PortalContext);
  return handleClosePortal;
}

export const usePortalContent = () => {
  const { portalContent, handlePortalContent } = useContext(PortalContext);
  return { portalContent, setPortalContent: handlePortalContent }
}

export const PortalProvider = ({ children }: PortalProviderProps) => {
  const [portalState, setPortalState] = useState<boolean>(false);
  const [portalContent, setPortalContent] = useState<ReactNode>(null);

  const handleOpenPortal = () => {
    setPortalState(true);
    document.body.style.overflow = "clip";
  }

  const handleClosePortal = () => {
    setPortalState(false);
    document.body.style.overflow = "auto";
  }

  const handlePortalContent = (content: ReactNode) => {
    setPortalContent(content);
  }

  return (
    <PortalContext value={{ portalState, portalContent, handleOpenPortal, handleClosePortal, handlePortalContent }}>
      {children}
    </PortalContext>
  )
}