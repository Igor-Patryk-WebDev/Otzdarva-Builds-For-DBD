import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalWrapperProps = {
  children: ReactNode
  portalState: any
  parent: HTMLElement | undefined
}

export const PortalWrapper = ({ children, portalState, parent }: PortalWrapperProps) => {
  return createPortal(
    <div className={`fixed h-full inset-0 transition-transform duration-300 ease-in-out ${!portalState && "translate-y-full"} z-00000`}>
      {children}
    </div>,
    parent ?? document.body
  );
}