import { useActionsSidebarPortalActions, useActionsSidebarPortalState } from "@/hooks/stores/BuildsEditorStores/useActionsSidebarPortalStore"
import { ActionsSidebar } from "../ActionsSidebar"
import { PortalWrapper } from "@/components/shared/PortalWrapper"
import { motion } from "motion/react"

type ActionsSidebarPortalProps = {}

export const ActionsSidebarPortal = ({ }: ActionsSidebarPortalProps) => {
  const isActionsSidebarPortalOpen = useActionsSidebarPortalState();
  const { closeActionsSidebarPortal } = useActionsSidebarPortalActions();
  return (
    <PortalWrapper
      portalState={isActionsSidebarPortalOpen}
      closePortal={closeActionsSidebarPortal}
      placement="left"
    >
      <motion.div
        key="actions-sidebar-panel"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          ease: 'easeInOut',
          duration: 0.3
        }}
        className="pointer-events-auto h-full"
      >
        <ActionsSidebar />
      </motion.div>
    </PortalWrapper >
  )
}