import type { ReactNode } from "react";

import { usePortalContent, usePortalState } from "@contexts/PortalContext";

import { createPortal } from "react-dom";

interface PortalWrapperProps {
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
export const PortalWrapper = ({ parent }: PortalWrapperProps) => {
  const portalState = usePortalState();
  const { portalContent } = usePortalContent();

  return createPortal(
    <div className={`fixed h-full inset-0 transition-transform duration-300 ease-in-out ${!portalState && "translate-y-full"}`}>
      {portalContent}
    </div>,
    parent ?? document.body
  );
}