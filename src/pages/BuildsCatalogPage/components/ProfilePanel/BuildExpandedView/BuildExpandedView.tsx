import type { ProfileBuild, ProfileData } from "@/types/profiles.types";

import { BuildExpandedViewDescription } from "./BuildExpandedViewDescription";
import { BuildExpandedViewPerksList } from "./BuildExpandedViewPerksList";
import { BuildExpandedViewHeading } from "./BuildExpandedViewHeading";
import { CharacterPortraitBlock } from "../CharacterPortraitBlock";

type BuildExpandedViewProps = {
  build: ProfileBuild
  profile: ProfileData
}

export const BuildExpandedView = ({ build, profile }: BuildExpandedViewProps) => {
  const { name: buildName, perks, notes } = build;
  const { name: profileName, portraitUrl, role } = profile;

  return (
    <div className="relative w-full max-w-240 px-4 sm:px-16 pt-8 flex flex-col max-h-[calc(100dvh-2rem)]">
      <BuildExpandedViewHeading buildName={buildName} profileName={profileName} />
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-none">
        <div className="py-4 sm:py-8 grid lg:grid-cols-[300px_minmax(500px,1fr)] grid-cols-1 items-center">
          <div className="hidden lg:block">
            <CharacterPortraitBlock name={profileName} portraitUrl={portraitUrl} role={role} />
          </div>
          <BuildExpandedViewPerksList perks={perks} role={role} />
        </div>
        <BuildExpandedViewDescription notes={notes} />
      </div>
    </div>
  )
}