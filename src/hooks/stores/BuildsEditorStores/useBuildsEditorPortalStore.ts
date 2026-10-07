import type { ProfileBuild, ProfileData } from "@/types/profiles.types";
import { create } from "zustand";

type PayloadType = {
  profile: ProfileData
  build?: ProfileBuild
}

type BuildsEditorPortalStoreType = {
  isOpen: boolean
  selectedProfile: ProfileData | null
  selectedBuild: ProfileBuild | null
  actions: {
    openBuildsEditorPortal: (payload: PayloadType) => void
    closeBuildsEditorPortal: () => void
  }
}

const useBuildsEditorPortalStore = create<BuildsEditorPortalStoreType>((set) => ({
  isOpen: false,
  selectedProfile: null,
  selectedBuild: null,
  actions: {
    openBuildsEditorPortal: ({ profile, build }) =>
      set({ isOpen: true, selectedProfile: profile, selectedBuild: build ?? null }),
    closeBuildsEditorPortal: () =>
      set({ isOpen: false }),
  }
}));

export const useBuildsEditorPortalState = () => useBuildsEditorPortalStore((state) => state.isOpen);

export const useBuildsEditorPortalActions = () => useBuildsEditorPortalStore((state) => state.actions);

export const useBuildsEditorPortalSelectedBuild = () => useBuildsEditorPortalStore((state) => state.selectedBuild);

export const useBuildsEditorPortalSelectedProfile = () => useBuildsEditorPortalStore((state) => state.selectedProfile);