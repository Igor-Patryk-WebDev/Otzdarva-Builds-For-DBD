import type { ReactNode } from "react";

import { useEditorPortalContent, useEditorPortalState } from "@contexts/EditorPortalContext";

import { createPortal } from "react-dom";

interface BuildsPortalWrapperProps {
  content?: ReactNode
  parent?: HTMLElement
}

/** 
 * PortalWrapper - Wrapper that uses `createPortal` in background to wrap your components without excesive code
 * 
 * `@props`: 
 * 
 * - `parent?` (default: `document.body`) - describes where to place your portal inside DOM
 */
export const EditorPortalWrapper = ({ parent }: BuildsPortalWrapperProps) => {
  const editorPortalState = useEditorPortalState();
  const { editorPortalContent } = useEditorPortalContent();

  return createPortal(
    <div className={`fixed h-full inset-0 transition-transform duration-300 ease-in-out ${!editorPortalState && "translate-y-full"} z-100000`}>
      {editorPortalContent}
    </div>,
    parent ?? document.body
  );
}