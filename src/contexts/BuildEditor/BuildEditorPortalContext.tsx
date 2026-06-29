import {
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useState, createContext, useContext
} from "react";

interface BuildEditorPortalContextProps {
  buildEditorPortalState: boolean
  buildEditorPortalContent: ReactNode
  openBuildEditorPortal: () => void
  closeBuildEditorPortal: () => void
  setBuildEditorPortalContent: Dispatch<SetStateAction<ReactNode>>
}

interface PortalProviderProps {
  children: ReactNode
}

const BuildEditorPortalContext = createContext<BuildEditorPortalContextProps>(undefined!);

export const useBuildEditorPortalState = () => {
  const { buildEditorPortalState, openBuildEditorPortal, closeBuildEditorPortal } = useContext(BuildEditorPortalContext);
  return { buildEditorPortalState, openBuildEditorPortal, closeBuildEditorPortal };
}

export const useBuildEditorPortalContent = () => {
  const { buildEditorPortalContent, setBuildEditorPortalContent } = useContext(BuildEditorPortalContext);
  return { buildEditorPortalContent, setBuildEditorPortalContent }
}

export const BuildEditorPortalProvider = ({ children }: PortalProviderProps) => {
  const [buildEditorPortalState, setBuildEditorPortalState] = useState(false);
  const [buildEditorPortalContent, setBuildEditorPortalContent] = useState<ReactNode>(null);

  const openBuildEditorPortal = () => {
    setBuildEditorPortalState(true);
    // document.body.style.overflow = "clip";
  }

  const closeBuildEditorPortal = () => {
    setBuildEditorPortalState(false);
    // document.body.style.overflow = "auto";
  }

  return (
    <BuildEditorPortalContext value={{ buildEditorPortalState, openBuildEditorPortal, closeBuildEditorPortal, buildEditorPortalContent, setBuildEditorPortalContent }}>
      {children}
    </BuildEditorPortalContext>
  )
}