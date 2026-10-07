import { create } from "zustand";

type AdminSidebarStoreType = {
  isOpen: boolean;
  actions: {
    openAdminSidebar: () => void;
    closeAdminSidebar: () => void;
    toggleAdminSidebar: () => void;
  };
};

const useAdminSidebarStore = create<AdminSidebarStoreType>((set) => ({
  isOpen: false,
  actions: {
    openAdminSidebar: () => set({ isOpen: true }),
    closeAdminSidebar: () => set({ isOpen: false }),
    toggleAdminSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}));

export const useAdminSidebarState = () =>
  useAdminSidebarStore((state) => state.isOpen);

export const useAdminSidebarActions = () =>
  useAdminSidebarStore((state) => state.actions);
