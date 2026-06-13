import type { ReactNode } from "react";

import { useBuildsPortalContent, useBuildsPortalState } from "@contexts/BuildsPortalContext";

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
export const BuildsPortalWrapper = ({ parent }: BuildsPortalWrapperProps) => {
  const buildsPortalState = useBuildsPortalState();
  const { buildsPortalContent } = useBuildsPortalContent();

  return createPortal(
    <div className={`fixed h-full inset-0 transition-transform duration-300 ease-in-out ${!buildsPortalState && "translate-y-full"} z-100000`}>
      {buildsPortalContent}
    </div>,
    parent ?? document.body
  );
}