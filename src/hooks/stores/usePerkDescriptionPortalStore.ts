import type { ProfileAlt, ProfilePerk } from "@/types/profiles.types";

import { create } from "zustand";

type PerkDescriptionPortalStoreType = {
  isOpen: boolean
  selectedPerk: ProfilePerk | ProfileAlt | null
  actions: {
    openPerkDescriptionPortal: (target: ProfilePerk | ProfileAlt) => void
    closePerkDescriptionPortal: () => void
  }
}

const usePerkDescriptionPortalStore = create<PerkDescriptionPortalStoreType>((set) => ({
  isOpen: false,
  selectedPerk: null,
  actions: {
    openPerkDescriptionPortal: (target) => {
      set({ isOpen: true, selectedPerk: target })
    },
    closePerkDescriptionPortal: () => {
      set({ isOpen: false })
    },
  }
}));

export const usePerkDescriptionPortalState = () => usePerkDescriptionPortalStore((state) => state.isOpen);

export const usePerkDescriptionPortalActions = () => usePerkDescriptionPortalStore((state) => state.actions);

export const usePerkDescriptionPortalSelectedPerk = () => usePerkDescriptionPortalStore((state) => state.selectedPerk);