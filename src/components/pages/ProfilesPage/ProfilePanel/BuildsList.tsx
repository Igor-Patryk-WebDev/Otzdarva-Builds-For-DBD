import { DecoratedHeading } from "@components/shared/DecoratedHeading";
import { useCloseBuildsPortal, useBuildsPortalContent } from "@contexts/BuildsPortalContext"
import type { ReactNode } from "react";

interface BuildsListProps {
  // builds: ProfileBuild[] | undefined
  name: string
  children: ReactNode
}

export const BuildsList = ({ name, children }: BuildsListProps) => {
  const closePortal = useCloseBuildsPortal();
  const { setBuildsPortalContent } = useBuildsPortalContent();

  return (
    <div className='absolute w-full max-w-400 max-h-full px-8 pt-8 bottom-0 right-1/2 translate-x-1/2 z-1000 bg-[hsl(220_5%_8%)] border border-neutral-800 rounded-tl-2xl rounded-tr-2xl'>
      <button className='absolute top-4 right-4 bg-otz size-8 rounded-sm cursor-pointer' onClick={() => {
        closePortal();
        setTimeout(() => {
          setBuildsPortalContent(null)
        }, 300);
      }}>X</button>
      <DecoratedHeading text={name} gap={4} size="3xl" />
      <div className='max-h-200 transition-all overflow-y-auto pb-16 scrollbar-none scrollbar-thumb-otz'>
        <div className='grid grid-cols-[minmax(0,466px)] lg:grid-cols-[repeat(2,minmax(0,466px))] 2xl:grid-cols-[repeat(3,minmax(0,466px))] justify-center gap-10 mx-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}