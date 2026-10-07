import { create } from "zustand";

type NotificationsManagerPortalStoreType = {
  isOpen: boolean
  actions: {
    openNotificationsManagerPortal: () => void
    closeNotificationsManagerPortal: () => void
  }
}

const useNotificationsManagerPortalStore = create<NotificationsManagerPortalStoreType>((set) => ({
  isOpen: false,
  actions: {
    openNotificationsManagerPortal: () => set({ isOpen: true }),
    closeNotificationsManagerPortal: () => set({ isOpen: false })
  }
}))

export const useNotificationsManagerPortalState = () => useNotificationsManagerPortalStore((state) => state.isOpen);

export const useNotificationsManagerPortalActions = () => useNotificationsManagerPortalStore((state) => state.actions);