import type { ProfileData } from "@/types/profiles.types";

import { useCharacterBuildsEditorPortalActions } from "@/hooks/stores/BuildsEditorStores/useCharacterBuildsEditorPortalStore";
import { CharacterPortraitBlock } from "@/pages/BuildsCatalogPage/components/ProfilePanel/CharacterPortraitBlock";
import { DecoratedHeading } from "@/components/DecoratedHeading";
import { Icon } from "@/components/shared/Icon";

type CustomProfileHeadingType = {
  profile: ProfileData
}

const CustomProfileHeading = ({ profile }: CustomProfileHeadingType) => {
  const { name, role } = profile;
  const { openCharacterBuildsEditorPortal } = useCharacterBuildsEditorPortalActions();

  const buildsCount = profile.builds?.length ?? 0

  return (
    <div className='w-full'>
      <DecoratedHeading text={name} className="gap-2" />
      <div className='flex gap-2 center'>
        <p className='text-center text-neutral-500 text-xs [text-decoration_underline]'>Builds: {buildsCount}</p>
        <button
          onClick={() => {
            openCharacterBuildsEditorPortal({ role, name })
          }}
          className='px-2 py-0.5 flex gap-1 items-center border border-otz rounded-lg bg-linear-90 from-otz/70 to-neutral-900/40 hover:bg-otz/80 active:bg-otz/80 backdrop-blur-sm shadow-lg text-center text-xs text-neutral-200 transition-all duration-150 cursor-pointer group active:scale-95'
        >
          Show
          <Icon icon="Menu" className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function CharacterProfileBlock({ profile }: { profile: ProfileData }) {
  const { name, portraitUrl, role } = profile

  return (
    <div className="flex flex-col gap-4 w-50">
      <CustomProfileHeading profile={profile} />
      <CharacterPortraitBlock name={name} portraitUrl={portraitUrl} role={role} />
    </div>
  );
}
