import type { DbdRole } from "@appTypes/DbdRole";
import type { Dispatch, SetStateAction } from "react";

import { Button } from "@components/shared/Button";
import { Link } from "@tanstack/react-router";

type AdminNavigationProps = {
  setRole: Dispatch<SetStateAction<DbdRole>>;
  onSearch: (value: string) => void;
};

export const AdminNavigation = ({
  setRole,
  onSearch,
}: AdminNavigationProps) => {
  return (
    <div className="flex gap-8 my-4">
      <Button color="grey">
        <Link to="/" target="_blank">
          Main Page
        </Link>
      </Button>
      <Button
        color="otz"
        onClick={() => {
          setRole("Killers");
        }}
      >
        Killers
      </Button>
      <Button
        color="otz"
        onClick={() => {
          setRole("Survivors");
        }}
      >
        Survivors
      </Button>
      <Button
        color="otz"
        onClick={async () => {
          await fetch("/api/logout.php", { method: "POST" });
        }}
      >
        <Link to="/login">Log Out</Link>
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
