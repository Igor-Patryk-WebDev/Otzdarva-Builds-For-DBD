import {
  type Dispatch,
  type SetStateAction,
  useState
} from "react";
import { useNotificationsManagerPortalActions } from "@/hooks/stores/BuildsEditorStores/useNotificationsManagerPortalStore";
import { useActionsSidebarPortalActions } from "@/hooks/stores/BuildsEditorStores/useActionsSidebarPortalStore";
import { useBuildsEditorPageDisplayMode } from "@/hooks/stores/BuildsEditorStores/useBuildsEditorPageStore";
import { RoleSwitcherButtons } from "./RoleSwitcherButtons";
import { OtherButtons } from "./OtherButtons";
import { SearchBar } from "@/components/shared/SearchBar";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Icon } from "@/components/shared/Icon";

type AdminNavigationProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  perkQuery: string;
  setPerkQuery: Dispatch<SetStateAction<string>>;
};

type SearchBarsProps = {
  displayMode: ReturnType<typeof useBuildsEditorPageDisplayMode>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  perkQuery: string;
  setPerkQuery: Dispatch<SetStateAction<string>>;
};

const SearchBars = ({ displayMode, searchQuery, setSearchQuery, perkQuery, setPerkQuery }: SearchBarsProps) => {
  switch (displayMode) {
    case "characterPanels":
      return (
        <div className="flex-1 w-full md:w-auto">
          <SearchBar value={searchQuery} onSearch={setSearchQuery} className="flex-1" />
        </div>
      )
    case "categorizedBuilds":
      return (
        <div className="flex gap-2 flex-1 w-full md:w-auto">
          <SearchBar value={searchQuery} onSearch={setSearchQuery} className="flex-1" />
          <SearchBar value={perkQuery} onSearch={setPerkQuery} className="flex-1" placeholder="Search for perk..." />
        </div>
      )
  }
};

export const Navigation = ({
  searchQuery,
  setSearchQuery,
  perkQuery,
  setPerkQuery,
}: AdminNavigationProps) => {
  const displayMode = useBuildsEditorPageDisplayMode();

  const { closeNotificationsManagerPortal } = useNotificationsManagerPortalActions();
  const { openActionsSidebarPortal } = useActionsSidebarPortalActions();

  const [isOpen] = useState();

  useHotkey("Escape", () => closeNotificationsManagerPortal());

  return (
    <div className="sticky top-0 isolate z-100 flex flex-col md:flex-row items-center gap-4 py-8 px-8 sm:px-16 border-b border-b-neutral-800 bg-almost-black">
      <div className="flex items-center gap-3">
        <button
          onClick={openActionsSidebarPortal}
          className={`flex items-center p-2 rounded-xl border bg-neutral-900/40 hover:bg-neutral-900/80 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg active:border-otz group ${isOpen
            ? "border-otz text-neutral-100"
            : "border-neutral-800 text-neutral-400 hover:text-neutral-200"
            }`}
        >
          <Icon
            icon="Menu"
            className={`size-5 transition-transform duration-200 group-hover:scale-110 ${isOpen ? "text-otz" : "text-neutral-400 group-hover:text-otz"}`}
          />
        </button>
        <RoleSwitcherButtons />
      </div>
      <SearchBars displayMode={displayMode} searchQuery={searchQuery} setSearchQuery={setSearchQuery} perkQuery={perkQuery} setPerkQuery={setPerkQuery} />
      <OtherButtons />
    </div>
  );
};
