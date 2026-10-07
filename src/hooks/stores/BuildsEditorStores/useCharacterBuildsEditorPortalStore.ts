import type { DbdRole } from "@/types/profiles.types";

import { create } from "zustand";

type ProfileTarget = {
  role: DbdRole
  name: string
}

type CharacterBuildsEditorPortalStoreType = {
  isOpen: boolean
  selectedProfile: ProfileTarget | null
  actions: {
    openCharacterBuildsEditorPortal: (target: ProfileTarget) => void
    closeCharacterBuildsEditorPortal: () => void
  }
}

const useCharacterBuildsEditorPortalStore = create<CharacterBuildsEditorPortalStoreType>((set) => ({
  isOpen: false,
  selectedProfile: null,
  actions: {
    openCharacterBuildsEditorPortal: (target) =>
      set({ isOpen: true, selectedProfile: target }),
    closeCharacterBuildsEditorPortal: () =>
      set({ isOpen: false })
  }
}))

export const useCharacterBuildsEditorPortalState = () => useCharacterBuildsEditorPortalStore((state) => state.isOpen);

export const useCharacterBuildsEditorPortalActions = () => useCharacterBuildsEditorPortalStore((state) => state.actions);

export const useCharacterBuildsEditorPortalSelectedProfile = () => useCharacterBuildsEditorPortalStore((state) => state.selectedProfile);