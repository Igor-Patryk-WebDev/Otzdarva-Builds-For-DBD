import type { ProfileBuild, ProfileData } from "@/types/profiles.types";

import { useBuildExtendedViewPortalActions } from "@/hooks/stores/useBuildExpandedViewPortalStore";
import { BuildPerksBlock } from "./BuildPerksBlock";
import { BuildNotesBlock } from "./BuildNotesBlock";

type BuildPanelProps = {
  build: ProfileBuild;
  profile: ProfileData;
}

export const BuildPanel = ({ build, profile }: BuildPanelProps) => {
  const { name, perks, notes } = build

  const { openBuildExtendedViewPortal } = useBuildExtendedViewPortalActions();

  return (
    <div className="relative overflow-clip w-full max-w-116 mx-auto py-1 px-4 sm:py-2 sm:px-6 grid grid-rows-[auto_auto_1fr] bg-neutral-900 border border-neutral-800 rounded-xl shadow shadow-neutral-950 group">
      <button
        onClick={() => openBuildExtendedViewPortal({ build, profile })}
        className="absolute inset-0 flex items-center justify-center w-full h-full backdrop-blur-xs bg-neutral-900/80 z-1 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
        <p>Expand build</p>
      </button>
      <div className="relative flex items-center justify-center mb-1 sm:mb-2 min-h-8">
        <h3 className="text-xl sm:text-2xl font-bold text-center px-8">{name}</h3>
      </div>
      <BuildPerksBlock perks={perks} />
      <BuildNotesBlock notes={notes} />
    </div>
  );
};