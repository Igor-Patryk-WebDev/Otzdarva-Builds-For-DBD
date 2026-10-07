import type { DbdRole } from "@/types/profiles.types";
import { create } from "zustand";

type GlobalAppStoreType = {
  canWebsiteScroll: boolean
  selectedRole: DbdRole | null
  activeModals: string[],
  actions: {
    enableWebsiteScrolling: () => void;
    disableWebsiteScrolling: () => void;
    setSelectedRole: (role: DbdRole) => void
    registerModal: (id: string) => void;
    removeModal: (id: string) => void;
  };
};

export const useGlobalAppStore = create<GlobalAppStoreType>((set) => ({
  canWebsiteScroll: false,
  selectedRole: null,
  activeModals: [],
  actions: {
    enableWebsiteScrolling: () => set({ canWebsiteScroll: true }),
    disableWebsiteScrolling: () => set({ canWebsiteScroll: false }),
    setSelectedRole: (role) => set({ selectedRole: role }),
    registerModal: (id) => set((state) => ({ activeModals: [...state.activeModals, id] })),
    removeModal: (id) => set((state) => ({ activeModals: state.activeModals.filter((popupId) => popupId !== id) }))
  },
}));

export const useWebsiteScrollingState = () =>
  useGlobalAppStore((state) => state.canWebsiteScroll);

export const useSelectedRole = () =>
  useGlobalAppStore((state) => state.selectedRole);

export const useIsTopMostModal = (id: string) =>
  useGlobalAppStore((state) => state.activeModals[state.activeModals.length - 1] === id);

export const useGlobalAppActions = () =>
  useGlobalAppStore((state) => state.actions);
