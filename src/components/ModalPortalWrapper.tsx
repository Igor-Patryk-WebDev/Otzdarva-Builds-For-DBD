import { motion } from "motion/react"
import { PortalWrapper } from "./shared/PortalWrapper"
import type { PropsWithChildren } from "react"

type ModalPortalWrapperProps = {
  portalState: boolean
  closePortal: () => void
} & PropsWithChildren

export const ModalPortalWrapper = ({ children, portalState, closePortal }: ModalPortalWrapperProps) => {
  return (
    <PortalWrapper
      portalState={portalState}
      closePortal={closePortal}
      placement="center"
    >
      <motion.div
        key="actions-sidebar-panel"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          ease: 'easeInOut',
          duration: 0.3
        }}
        className="pointer-events-auto max-h-full"
      >
        {children}
      </motion.div>
    </PortalWrapper>
  )
}