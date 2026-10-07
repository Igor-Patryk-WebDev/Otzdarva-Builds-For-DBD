import { type ComponentPropsWithoutRef } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

type PortalPlacement = "bottom" | "left" | "right" | "top" | "center";

type PortalWrapperProps = {
  portalState: any
  closePortal: () => void
  placement: PortalPlacement
} & ComponentPropsWithoutRef<"div">

const PLACEMENT_STYLES: Record<PortalPlacement, string> = {
  bottom: "items-end justify-center",
  left: "items-stretch justify-start",
  right: "items-stretch justify-end",
  top: "items-start justify-center",
  center: "items-center justify-center"
}

export const PortalWrapper = ({ children, portalState, closePortal, placement = 'center', className }: PortalWrapperProps) => {
  return createPortal(
    <AnimatePresence>
      {portalState && (
        <div className='relative isolate z-10000'>
          <motion.div
            key="portal-wrapper-element-backdrop"
            onClick={closePortal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />
          <div className={`fixed inset-0 h-full pointer-events-none flex ${PLACEMENT_STYLES[placement]} z-1 ${className}`}>
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}