import type { PropsWithChildren } from "react";

import { useProfileBuildsPortalActions } from "@/hooks/stores/useCharacterBuildsPortalStore";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Icon } from "@/components/shared/Icon";

type ProfileBuildsWrapperProps = {
  name: string
  buildsCount: number
} & PropsWithChildren

export const ProfileBuildsWrapper = ({ children, name, buildsCount }: ProfileBuildsWrapperProps) => {
  const { closeProfileBuildsPortal } = useProfileBuildsPortalActions();

  useHotkey("Escape", () => closeProfileBuildsPortal());

  return (
    <div className='relative px-4 sm:px-16 pt-8'>
      <div className="relative py-4 border-b border-neutral-800">
        <button
          onClick={() => closeProfileBuildsPortal()}
          className={`absolute top-0 right-0 hidden xl:flex items-center p-2 rounded-xl border bg-neutral-900/40 hover:bg-neutral-900/80 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg active:border-otz group border-neutral-800 text-neutral-400 hover:text-neutral-200`}
        >
          <Icon
            icon="Close"
            className={`size-5 transition-transform duration-200 group-hover:scale-110 text-neutral-400 group-hover:text-otz group-active:text-otz group-active:scale-110`}
          />
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">{name}</h2>
          <p className="text-neutral-400 text-sm sm:text-base">Builds: {buildsCount}</p>
        </div>
      </div>
      <div className='max-h-[calc(100dvh-10rem)] transition-all overflow-y-auto scrollbar-none scrollbar-thumb-otz py-8'>
        <div className='grid grid-cols-[minmax(0,466px)] lg:grid-cols-[repeat(2,minmax(0,466px))] 2xl:grid-cols-[repeat(3,minmax(0,466px))] justify-center gap-10 mx-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}