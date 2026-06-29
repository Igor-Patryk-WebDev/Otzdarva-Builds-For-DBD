import type { Dispatch, SetStateAction } from "react";
import type { DbdRole } from "@appTypes/DbdRole";

import { useAnnouncementsPortalState } from "@contexts/AnnouncementsPortalContext";
import { AnnouncementsButton } from "./AnnouncementsButton";
import { RoleSwitcherButtons } from "./RoleSwitcherButtons";
import { OtherButtons } from "./OtherButtons";

import { SearchBar } from "@components/shared/SearchBar";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Button } from "@components/shared/Button";

type AdminNavigationProps = {
  setRole: Dispatch<SetStateAction<DbdRole>>
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
};

export const AdminNavigation = ({ setRole, searchQuery, setSearchQuery }: AdminNavigationProps) => {
  const { closeAnnouncementsPortal } = useAnnouncementsPortalState();

  useHotkey("Escape", () => {
    closeAnnouncementsPortal();
  });

  return (
    <div className="flex gap-4 my-4 border-b border-b-neutral-800 pb-8 mb-8">
      <RoleSwitcherButtons setRole={setRole} />
      <AnnouncementsButton />
      <OtherButtons />
      <div className="flex-1">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
      </div>
      <Button
        className="bg-otz px-3 rounded-md"
        onClick={async () => {
          const res = await fetch("/api/request_scrape.php", { method: "POST" });
          const data = await res.json();
          if (!data.success) console.log(data.error);
        }}>
        Scrape Wiki
      </Button>
    </div>
  );
};
