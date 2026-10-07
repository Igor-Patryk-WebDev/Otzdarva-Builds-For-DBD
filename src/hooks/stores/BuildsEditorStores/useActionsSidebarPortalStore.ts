import { create } from "zustand";

type ActionsSidebarPortalStoreType = {
  isOpen: boolean
  actions: {
    openActionsSidebarPortal: () => void
    closeActionsSidebarPortal: () => void
  }
}

const useActionsSidebarPortalStore = create<ActionsSidebarPortalStoreType>((set) => ({
  isOpen: false,
  actions: {
    openActionsSidebarPortal: () => set({ isOpen: true }),
    closeActionsSidebarPortal: () => set({ isOpen: false })
  }
}))

export const useActionsSidebarPortalState = () => useActionsSidebarPortalStore((state) => state.isOpen);

export const useActionsSidebarPortalActions = () => useActionsSidebarPortalStore((state) => state.actions);