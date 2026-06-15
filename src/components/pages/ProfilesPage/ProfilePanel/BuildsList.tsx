import { Button } from "@components/shared/Button";
import { DecoratedHeading } from "@components/shared/DecoratedHeading";
import { IconSVG } from "@components/shared/IconSVG";
import { useCloseBuildsPortal, useBuildsPortalContent } from "@contexts/BuildsPortalContext"
import { useHotkey } from "@tanstack/react-hotkeys";
import type { ReactNode } from "react";

interface BuildsListProps {
  // builds: ProfileBuild[] | undefined
  name: string
  children: ReactNode
}

export const BuildsList = ({ name, children }: BuildsListProps) => {
  const closePortal = useCloseBuildsPortal();
  const { setBuildsPortalContent } = useBuildsPortalContent();

  useHotkey("Escape", () => closePortal());

  return (
    <div className='absolute w-full max-w-400 max-h-full px-4 sm:px-8 pt-8 bottom-0 right-1/2 translate-x-1/2 z-1000 bg-[hsl(220_5%_8%)] border border-neutral-800 rounded-tl-2xl rounded-tr-2xl'>
      <Button className='absolute top-4 right-4 bg-otz hover:bg-[hsl(from_var(--color-otz)_h_s_40%)] size-6 sm:size-8 rounded-sm flex items-center justify-center' onClick={() => {
        closePortal();
        setTimeout(() => {
          setBuildsPortalContent(null)
        }, 300);
      }}>
        <IconSVG icon="Close" size={1.5} />
      </Button>
      <DecoratedHeading text={name} gap={4} className="text-2xl sm:text-3xl" />
      <div className='max-h-200 transition-all overflow-y-auto scrollbar-none scrollbar-thumb-otz mt-6'>
        <div className='grid grid-cols-[minmax(0,466px)] mb-32 lg:grid-cols-[repeat(2,minmax(0,466px))] 2xl:grid-cols-[repeat(3,minmax(0,466px))] justify-center gap-10 mx-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}