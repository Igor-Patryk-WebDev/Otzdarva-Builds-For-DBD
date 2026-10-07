import type { DbdRole, ProfileAlt, ProfilePerk } from "@/types/profiles.types"

import { BuildExpandedViewMainPerkDetails } from "./BuildExpandedViewMainPerkDetails"
import { useEffect, useRef, useState } from "react"
import { PerksCountBlock } from "@/components/PerksCountBlock"
import { PerkBlock } from "@/components/PerkBlock"
import { useAltPerksListPortalActions } from "@/hooks/stores/useAltPerksListPortalStore"
import { usePerkDescriptionPortalActions } from "@/hooks/stores/usePerkDescriptionPortalStore"

type BuildExpandedViewPerksListProps = {
  perks: ProfilePerk[]
  role: DbdRole
}

type BuildExpandedViewPerkBlockProps = {
  role: DbdRole
  perk: ProfilePerk | ProfileAlt
}

type BuildExpandedViewAltPerksListProps = {
  role: DbdRole
  perk: ProfilePerk
  isOpen: boolean
  onClose: () => void
}

// type BuildExpandedViewPerkDetailsProps = {
//   perk: ProfilePerk
//   visible: boolean
//   onClose: () => void
// }

// const PerkDetails = ({ perk, visible, onClose, ...rest }: BuildExpandedViewPerkDetailsProps) => {
//   return (
//     <>
//       {/* Mobile backdrop overlay */}
//       <div
//         className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-9999 sm:hidden ${visible ? "block" : "hidden"
//           }`}
//         onClick={(e) => {
//           e.stopPropagation();
//           onClose?.();
//         }}
//       />
//       <div
//         className={`fixed top-1/2 right-0 -translate-y-1/2 sm:translate-y-0 shadow-2xl shadow-black z-10000 w-full sm:w-150 bg-black ${visible ? "block" : "hidden"
//           } sm:custom-anchor`}
//         {...rest}
//       >
//         <div className='relative overflow-clip px-4 before:content-[""] before:absolute before:w-full before:h-full before:inset-0 before:bg-[url(/images/CharPortrait_roleBG.webp)] before:bg-size-[150%] before:bg-no-repeat before:bg-position-[center_50%] before:killers-filter before:-z-1'>
//           <h3 className="text-xl sm:text-2xl font-bold border-b-2 py-2">
//             {perk.name}
//           </h3>
//           <p className="text-sm sm:text-base font-extralight italic py-2">
//             {perk.obtainment}
//           </p>
//         </div>
//         <div
//           className="bg-neutral-900 border border-t-0 border-neutral-800 p-4 text-xs sm:text-sm"
//           dangerouslySetInnerHTML={{ __html: perk.description ?? "" }}
//         />
//         <p className="absolute block sm:hidden my-1 top-full right-1/2 translate-x-1/2 text-center text-xs text-neutral-400">
//           Click away to close
//         </p>
//       </div>
//     </>
//   );
// };

const BuildExpandedViewPerkBlock = ({ role, perk }: BuildExpandedViewPerkBlockProps) => {
  return (
    <li>
      <div className="grid grid-cols-[auto_1fr] gap-4">
        <PerkBlock perkUrl={perk.iconUrl} className="w-21" />
        <BuildExpandedViewMainPerkDetails role={role} perk={perk} />
      </div>
    </li>
  )
}

const BuildExpandedViewAltPerksList = ({ role, perk, isOpen, onClose }: BuildExpandedViewAltPerksListProps) => {
  if (!isOpen) return null;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) onClose();
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full z-10 before:content-[''] before:absolute before:-inset-2 before:bg-neutral-900 before:border before:border-neutral-800 before:rounded-xl before:-z-1"
    >
      <ul className="flex flex-col gap-3 justify-center">
        <BuildExpandedViewPerkBlock role={role} perk={perk} />
        {perk.alts.map((alt, altIndex) => (
          <BuildExpandedViewPerkBlock role={role} perk={alt} key={`extended-view-alt-perk-${altIndex}`} />
        ))}
      </ul>
    </div>
  )
}

export const BuildExpandedViewPerksList = ({ perks, role }: BuildExpandedViewPerksListProps) => {

  const [clickedPerkIndex, setClickedPerkIndex] = useState<number | null>(null);

  const { openAltPerksListPortal } = useAltPerksListPortalActions();
  const { openPerkDescriptionPortal } = usePerkDescriptionPortalActions();

  return (
    <div className="relative py-4 px-4 lg:pl-8 bg-neutral-900 border border-neutral-800 lg:rounded-tr-2xl lg:rounded-br-2xl rounded-2xl lg:rounded-none">
      {/* <CharacterPortraitBlock name={profileName} portraitUrl={portraitUrl} role={role} /> */}
      {/* <h2 className="font-bold text-2xl mb-4">Perks:</h2> */}
      <ul className="flex flex-col gap-3 justify-center">
        {perks.map((perk, perkIndex) => {
          const hasAlts = perk.alts.length > 0;
          const isAltOpen = clickedPerkIndex === perkIndex;
          return (
            <li key={`extended-view-perk-${perkIndex}`} className="relative">
              <div className="grid grid-cols-[auto_1fr] gap-2 sm:gap-4">
                <div className="relative">
                  <PerkBlock
                    perkUrl={perk.iconUrl}
                    className="w-15 sm:w-20"
                    onClick={() => {
                      hasAlts
                        ? openAltPerksListPortal(perk)
                        : openPerkDescriptionPortal(perk)
                    }}
                  />
                  {hasAlts &&
                    <PerksCountBlock count={perk.alts.length} />
                  }
                </div>
                <BuildExpandedViewMainPerkDetails role={role} perk={perk} />
              </div>
              <BuildExpandedViewAltPerksList role={role} perk={perk} isOpen={isAltOpen} onClose={() =>
                setClickedPerkIndex(null)
              } />
            </li>
          )
        })}
      </ul>
    </div>
  )
}