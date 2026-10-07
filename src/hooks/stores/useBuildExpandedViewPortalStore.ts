import type { ProfileBuild, ProfileData } from "@/types/profiles.types";

import { create } from "zustand";

type PayloadType = {
  build: ProfileBuild
  profile: ProfileData
}

type BuildExtendedViewPortalStoreType = {
  isOpen: boolean
  selectedBuild: ProfileBuild | null
  selectedProfile: ProfileData | null
  actions: {
    openBuildExtendedViewPortal: (payload: PayloadType) => void
    closeBuildExtendedViewPortal: () => void
  }
}

const useBuildExtendedViewPortalStore = create<BuildExtendedViewPortalStoreType>((set) => ({
  isOpen: false,
  selectedBuild: null,
  selectedProfile: null,
  actions: {
    openBuildExtendedViewPortal: ({ build, profile }) =>
      set({ isOpen: true, selectedBuild: build, selectedProfile: profile }),
    closeBuildExtendedViewPortal: () =>
      set({ isOpen: false }),
  }
}));

export const useBuildExtendedViewPortalState = () => useBuildExtendedViewPortalStore((state) => state.isOpen);

export const useBuildExtendedViewPortalActions = () => useBuildExtendedViewPortalStore((state) => state.actions);

export const useBuildExtendedViewPortalSelectedBuild = () => useBuildExtendedViewPortalStore((state) => state.selectedBuild);

export const useBuildExtendedViewPortalSelectedProfile = () => useBuildExtendedViewPortalStore((state) => state.selectedProfile);