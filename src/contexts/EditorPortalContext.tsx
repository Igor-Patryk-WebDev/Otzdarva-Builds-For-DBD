import { createContext, useContext, useState, type ReactNode } from "react";

interface PortalContextProps {
  editorPortalState: boolean
  editorPortalContent: ReactNode
  handleOpenEditorPortal: () => void
  handleCloseEditorPortal: () => void
  handleEditorPortalContent: (content: ReactNode) => void
}

interface PortalProviderProps {
  children: ReactNode
}

const EditorPortalContext = createContext<PortalContextProps>(undefined!);

export const useEditorPortalState = () => {
  const { editorPortalState } = useContext(EditorPortalContext);
  return editorPortalState;
}

export const useOpenEditorPortal = () => {
  const { handleOpenEditorPortal } = useContext(EditorPortalContext);
  return handleOpenEditorPortal;
}

export const useCloseEditorPortal = () => {
  const { handleCloseEditorPortal } = useContext(EditorPortalContext);
  return handleCloseEditorPortal;
}

export const useEditorPortalContent = () => {
  const { editorPortalContent, handleEditorPortalContent } = useContext(EditorPortalContext);
  return { editorPortalContent, setEditorPortalContent: handleEditorPortalContent }
}

export const EditorPortalProvider = ({ children }: PortalProviderProps) => {
  const [editorPortalState, setEditorPortalState] = useState<boolean>(false);
  const [editorPortalContent, setEditorPortalContent] = useState<ReactNode>(null);

  const handleOpenEditorPortal = () => {
    setEditorPortalState(true);
    document.body.style.overflow = "clip";
  }

  const handleCloseEditorPortal = () => {
    setEditorPortalState(false);
    document.body.style.overflow = "auto";
  }

  const handleEditorPortalContent = (content: ReactNode) => {
    setEditorPortalContent(content);
  }

  return (
    <EditorPortalContext value={{ editorPortalState, editorPortalContent, handleOpenEditorPortal, handleCloseEditorPortal, handleEditorPortalContent }}>
      {children}
    </EditorPortalContext>
  )
}