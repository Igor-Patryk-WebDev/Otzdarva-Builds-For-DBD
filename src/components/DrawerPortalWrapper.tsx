import type { PropsWithChildren } from "react"

import { PortalWrapper } from "./shared/PortalWrapper"
import { motion, useDragControls, useMotionValue, animate } from "motion/react"

type DrawerPortalWrapperProps = {
  portalState: boolean
  closePortal: () => void
} & PropsWithChildren

export const DrawerPortalWrapper = ({ children, portalState, closePortal }: DrawerPortalWrapperProps) => {
  const dragControls = useDragControls();
  const y = useMotionValue(0);

  return (
    <PortalWrapper
      portalState={portalState}
      closePortal={closePortal}
      placement="bottom"
    >
      <motion.div
        key="portal-wrapper-element"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        style={{ y }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y >= 500) {
            closePortal();
          } else {
            animate(y, 0, { type: "spring", stiffness: 400, damping: 40 });
          }
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.3
        }}
        className="pointer-events-auto max-h-full"
      >
        <div className='relative bg-almost-black border-l border-r border-t border-neutral-800 rounded-tl-2xl rounded-tr-2xl'>
          <div
            className="absolute top-0 left-0 right-0 rounded-tl-2xl rounded-tr-2xl touch-none select-none h-8 z-1"
            onPointerDown={(e) => dragControls.start(e)}
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full h-1 w-40 bg-neutral-900 cursor-grab active:cursor-grabbing" />
          </div>
          {children}
        </div>
      </motion.div>
    </PortalWrapper>
  )
}