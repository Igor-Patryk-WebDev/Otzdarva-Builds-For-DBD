import type { DbdRole } from "@appTypes/DbdRole";
import type { Dispatch, SetStateAction } from "react";

import { Button } from "@components/shared/Button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AnnouncementPortal } from "./Announcements/AnnouncementPortal";
import { useHotkey } from "@tanstack/react-hotkeys";

type AdminNavigationProps = {
  setRole: Dispatch<SetStateAction<DbdRole>>;
  onSearch: (value: string) => void;
};

export const AdminNavigation = ({
  setRole,
  onSearch,
}: AdminNavigationProps) => {
  const [showPortal, setShowPortal] = useState(false);

  useHotkey("Escape", () => {
    setShowPortal(false);
  });

  if (showPortal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return (
    <div className="flex gap-8 my-4">
      <Button>
        <Link to="/" target="_blank">
          Main Page
        </Link>
      </Button>
      <Button
        onClick={() => {
          setRole("Killers");
        }}
      >
        Killers
      </Button>
      <Button
        onClick={() => {
          setRole("Survivors");
        }}
      >
        Survivors
      </Button>
      <Button onClick={() => setShowPortal(true)} className="relative">
        Announcement
      </Button>
      {showPortal &&
        createPortal(
          <AnnouncementPortal onClose={() => setShowPortal(false)} />,
          document.body,
        )}
      <Button
        onClick={async () => {
          await fetch("/api/logout.php", { method: "POST" });
        }}
      >
        <Link to="/login">Log Out</Link>
      </Button>
      <Button onClick={async () => {
        const res = await fetch("/api/request_scrape.php", { method: "POST" });
        const data = await res.json();
        if (!data.success) console.log(data.error);
      }}>
        Scrape Wiki
      </Button>
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search perks"
          className="w-full bg-neutral-800 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-600 focus:outline-none focus:border-otz text-sm"
        />
      </div>
    </div>
  );
};
