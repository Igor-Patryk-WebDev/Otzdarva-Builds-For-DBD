import type { ProfilePerk } from "@/types/profiles.types";

import { create } from "zustand";

type AltPerksListPortalStoreType = {
  isOpen: boolean
  selectedPerk: ProfilePerk | null
  actions: {
    openAltPerksListPortal: (target: ProfilePerk) => void
    closeAltPerksListPortal: () => void
  }
}

const useAltPerksListPortalStore = create<AltPerksListPortalStoreType>((set) => ({
  isOpen: false,
  selectedPerk: null,
  actions: {
    openAltPerksListPortal: (target) => {
      set({ isOpen: true, selectedPerk: target })
    },
    closeAltPerksListPortal: () => {
      set({ isOpen: false })
    },
  }
}));

export const useAltPerksListPortalState = () => useAltPerksListPortalStore((state) => state.isOpen);

export const useAltPerksListPortalActions = () => useAltPerksListPortalStore((state) => state.actions);

export const useAltPerksListPortalSelectedPerk = () => useAltPerksListPortalStore((state) => state.selectedPerk);