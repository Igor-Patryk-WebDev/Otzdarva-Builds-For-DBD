import type { DbdRole } from "@/types/profiles.types"

import { useProfileBuildsPortalActions } from "@/hooks/stores/useCharacterBuildsPortalStore"
import { DecoratedHeading } from "@/components/DecoratedHeading"
import { Icon } from "@/components/shared/Icon"

type ProfileHeaderProps = {
  name: string
  role: DbdRole
  buildsCount: number
}

export const ProfileHeader = ({ name, role, buildsCount }: ProfileHeaderProps) => {
  const { openProfileBuildsPortal } = useProfileBuildsPortalActions();
  return (
    <div className='absolute bottom-[calc(100%+10px)] w-full'>
      <DecoratedHeading text={name} className="text-xl sm:text-2xl" />
      {buildsCount > 0 &&
        <div className='flex gap-2 center mb-1'>
          <p className='text-center text-neutral-500 text-xs sm:text-sm [text-decoration_underline]'>Builds: {buildsCount}</p>
          <button
            onClick={() => {
              openProfileBuildsPortal({ role, name })
            }}
            className='
              px-2
              flex gap-1 items-center
              border border-otz rounded-md bg-otz/70 hover:bg-otz/80 active:bg-otz/80 backdrop-blur-sm shadow-lg
              text-center text-xs sm:text-sm text-neutral-200
              transition-all duration-150 cursor-pointer group
              active:scale-95
              '>
            Show
            <Icon icon="Menu" className="size-4" />
          </button>
        </div>
      }
    </div>
  )
}