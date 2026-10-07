import type { DbdRole } from "@/types/profiles.types";

import { create } from "zustand";

type ProfileTarget = {
  role: DbdRole
  name: string
}

type ProfileBuildsPortalStoreType = {
  isOpen: boolean
  selectedProfile: ProfileTarget | null
  actions: {
    openProfileBuildsPortal: (target: ProfileTarget) => void
    closeProfileBuildsPortal: () => void
  }
}

const useProfileBuildsPortalStore = create<ProfileBuildsPortalStoreType>((set) => ({
  isOpen: false,
  selectedProfile: null,
  actions: {
    openProfileBuildsPortal: (target) => {
      document.body.style.overflow = "clip";
      set({ isOpen: true, selectedProfile: target })
    },
    closeProfileBuildsPortal: () => {
      document.body.style.overflow = "auto";
      set({ isOpen: false })
    },
  }
}));

export const useProfileBuildsPortalState = () => useProfileBuildsPortalStore((state) => state.isOpen);

export const useProfileBuildsPortalActions = () => useProfileBuildsPortalStore((state) => state.actions);

export const useProfileBuildsPortalSelectedProfile = () => useProfileBuildsPortalStore((state) => state.selectedProfile);