import type { ReactNode } from "react";

import { create } from "zustand";

type BuildEditorPortalStoreType = {
  isOpen: boolean
  portalContent: ReactNode | null
  actions: {
    openBuildEditorPortal: () => void
    closeBuildEditorPortal: () => void
    setBuildEditorPortalContent: (content: ReactNode) => void
  }
}

const useBuildEditorPortalStore = create<BuildEditorPortalStoreType>((set) => ({
  isOpen: false,
  portalContent: null,
  actions: {
    openBuildEditorPortal: () => set({ isOpen: true }),
    closeBuildEditorPortal: () => set({ isOpen: false }),
    setBuildEditorPortalContent: (content: ReactNode) => set({ portalContent: content })
  }
}));

export const useBuildEditorPortalState = () => useBuildEditorPortalStore((state) => state.isOpen);

export const useBuildEditorPortalContent = () => useBuildEditorPortalStore((state) => state.portalContent);

export const useBuildEditorPortalActions = () => useBuildEditorPortalStore((state) => state.actions);