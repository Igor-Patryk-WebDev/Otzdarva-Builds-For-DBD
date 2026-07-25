import type { ReactNode } from "react";
import type { ProfileBuild } from "@appTypes/profiles.types";
import { BuildPerksBlock } from "./BuildPerksBlock";
import { BuildNotesBlock } from "./BuildNotesBlock";

interface BuildPanelProps {
  build: ProfileBuild;
  headerActions?: ReactNode;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
}

export const BuildPanel = ({ build, headerActions, leftActions, rightActions }: BuildPanelProps) => {
  const name = build.name;
  const perks = build.perks;
  const notes = build.notes;

  return (
    <div className="max-w-116.5 mx-auto px-4 sm:px-6 grid grid-rows-[auto_auto_1fr] bg-neutral-900 border border-neutral-800 rounded-md shadow shadow-neutral-950">
      <div className="relative flex items-center justify-center my-2 min-h-8">
        {leftActions && (
          <div className="absolute left-0 flex items-center gap-1">
            {leftActions}
          </div>
        )}
        <h3 className="text-xl sm:text-2xl font-bold text-center px-8">{name}</h3>
        {(rightActions || headerActions) && (
          <div className="absolute right-0 flex items-center gap-1">
            {rightActions || headerActions}
          </div>
        )}
      </div>
      <BuildPerksBlock perks={perks} />
      <BuildNotesBlock notes={notes} />
    </div>
  );
};