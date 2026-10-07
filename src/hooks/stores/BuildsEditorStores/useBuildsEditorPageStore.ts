import { create } from "zustand";

export type DisplayMode = "characterPanels" | "categorizedBuilds";

type BuildsEditorPageStoreType = {
  displayMode: DisplayMode
  actions: {
    setDisplayMode: (displayMode: DisplayMode) => void
  }
}

const useBuildsEditorPageStore = create<BuildsEditorPageStoreType>((set) => ({
  displayMode: "characterPanels",
  actions: {
    setDisplayMode: (displayMode: DisplayMode) => set({ displayMode: displayMode })
  }
}))

export const useBuildsEditorPageDisplayMode = () => useBuildsEditorPageStore((state) => state.displayMode);

export const useBuildsEditorPageActions = () => useBuildsEditorPageStore((state) => state.actions);