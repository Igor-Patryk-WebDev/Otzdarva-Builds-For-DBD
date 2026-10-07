import {
  useNotificationsManagerPortalActions,
  useNotificationsManagerPortalState
} from "@/hooks/stores/BuildsEditorStores/useNotificationsManagerPortalStore";
import { NotificationsManager } from "../NotificationsManager/NotificationsManager";
import { PortalWrapper } from "@/components/shared/PortalWrapper";
import { motion } from "motion/react";

type NotificationsManagerPortalProps = {};

export const NotificationsManagerPortal = ({ }: NotificationsManagerPortalProps) => {
  const isNotificationsManagerPortalOpen = useNotificationsManagerPortalState();
  const { closeNotificationsManagerPortal } = useNotificationsManagerPortalActions();

  return (
    <PortalWrapper
      portalState={isNotificationsManagerPortalOpen}
      closePortal={closeNotificationsManagerPortal}
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
        className="pointer-events-auto"
      >
        <NotificationsManager />
      </motion.div>
    </PortalWrapper>
  );
};