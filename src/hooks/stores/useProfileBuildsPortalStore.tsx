import type { ProfilesData } from "@appTypes/profiles.types";
import type { ReactNode } from "react";

import { create } from "zustand";

type ProfileBuildsPortalContentFn = (profiles: ProfilesData) => ReactNode;

type ProfileBuildsPortalStoreType = {
  isOpen: boolean
  portalContent: ProfileBuildsPortalContentFn | null
  actions: {
    openProfileBuildsPortal: () => void
    closeProfileBuildsPortal: () => void
    setProfileBuildsPortalContent: (contentFn: ProfileBuildsPortalContentFn) => void
  }
}

const useProfileBuildsPortalStore = create<ProfileBuildsPortalStoreType>((set) => ({
  isOpen: false,
  portalContent: null,
  actions: {
    openProfileBuildsPortal: () => {
      document.body.style.overflow = "clip";
      set({ isOpen: true })
    },
    closeProfileBuildsPortal: () => {
      document.body.style.overflow = "auto";
      set({ isOpen: false })
    },
    setProfileBuildsPortalContent: (contentFn: ProfileBuildsPortalContentFn) => set({ portalContent: contentFn })
  }
}));

export const useProfileBuildsPortalState = () => useProfileBuildsPortalStore((state) => state.isOpen);

export const useProfileBuildsPortalContent = () => useProfileBuildsPortalStore((state) => state.portalContent);

export const useProfileBuildsPortalActions = () => useProfileBuildsPortalStore((state) => state.actions);