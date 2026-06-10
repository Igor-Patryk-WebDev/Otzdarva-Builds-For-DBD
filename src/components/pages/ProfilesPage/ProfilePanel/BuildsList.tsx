import type { ProfileBuild } from "@appTypes/Profiles";

import { useClosePortal, usePortalContent } from "@contexts/PortalContext"
import { BuildPanel } from "./BuildPanel";

interface BuildsListProps {
  builds: ProfileBuild[] | undefined
}

export const BuildsList = ({ builds }: BuildsListProps) => {
  const closePortal = useClosePortal();
  const { setPortalContent } = usePortalContent();

  return (
    <div className='absolute w-full max-w-400 max-h-full bottom-0 right-1/2 translate-x-1/2 z-100 bg-[hsl(220_5%_8%)] border border-neutral-800 rounded-tl-2xl rounded-tr-2xl'>
      <button className='absolute top-4 right-4 bg-otz size-8 rounded-sm cursor-pointer' onClick={() => {
        closePortal();
        setTimeout(() => {
          setPortalContent(null)
        }, 300);
      }}>X</button>
      <div className='grid grid-cols-3 gap-10 m-8 my-16'>
        {builds &&
          builds.map((build) => (
            <BuildPanel build={build} />
          ))
        }
      </div>
    </div>
  )
}