import type { ProfileAlt, ProfilePerk } from "@appTypes/Profiles";
import { useState, type ComponentPropsWithoutRef } from "react";

interface BuildPerksBlockProps {
  perks: ProfilePerk[];
}

const Perk = ({ perk }: { perk: Omit<ProfilePerk, "alts"> }) => {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [detailsHovered, setDetailsHovered] = useState(false);

  const visible = pinned && (hovered || detailsHovered);

  return (
    <div className={`relative group/perk max-h-24.5 aspect-square ${!visible && "cursor-pointer"}`}
      style={{
        anchorName: "--perk",
        anchorScope: "--perk"
      }}
      onClick={() => setPinned(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); if (!detailsHovered) setPinned(false); }}
    >
      <img className={`bg-[url(/images/perk-background-red.png)] bg-cover aspect-square p-[3%] hover:drop-shadow hover:drop-shadow-otz ${visible && "drop-shadow drop-shadow-otz"}`} src={perk.iconUrl} alt={perk.name + " perk icon"} />
      <PerkDetails
        perk={perk}
        visible={visible}
        onMouseEnter={() => setDetailsHovered(true)}
        onMouseLeave={() => { setDetailsHovered(false); setPinned(false); }}
      />
    </div>
  )
}

type PerkDetailsProps = ComponentPropsWithoutRef<"div"> & {
  perk: Omit<ProfilePerk, "alts">
  visible: boolean
}

const PerkDetails = ({ perk, visible, ...rest }: PerkDetailsProps) => {
  return (
    <div
      className={`fixed shadow-2xl shadow-black z-10000 w-150 bg-black ${visible ? "block" : "hidden"}`}
      style={{
        positionAnchor: '--perk',
        left: 'anchor(right)',
        top: 'anchor(top)',
        positionTryFallbacks: '--top-right, --bottom-right, --top-left, --bottom-left'
      }}
      {...rest}
    >
      <div className='relative overflow-clip px-4 before:content-[""] before:absolute before:w-full before:h-full before:inset-0 before:bg-[url(/images/CharPortrait_roleBG.webp)] before:bg-size-[150%] before:bg-no-repeat before:bg-position-[center_50%] before:killer-filter before:-z-1'>
        <h3 className='text-2xl font-bold border-b-2 py-2'>{perk.name}</h3>
        <p className='text-md font-extralight italic py-2'>{perk.obtainment}</p>
      </div>
      <div className='bg-neutral-900 border border-t-0 border-neutral-800 p-4 text-sm' dangerouslySetInnerHTML={{ __html: perk.description }} />
    </div>
  )
}

const AltsBlock = ({ alts }: { alts: ProfileAlt[] }) => {
  return (
    <div className='absolute hidden group-hover/showAlts:block top-full shadow-md shadow-black pb-4 rounded-bl-lg rounded-br-lg z-4 bg-neutral-900 border border-t-0 border-neutral-800'>
      {alts.map((alt) => {
        return (
          <Perk perk={alt} />
        )
      })}
    </div>
  )
}

const PerkBlock = ({ perk }: { perk: ProfilePerk }) => {
  return (
    <div className='relative grid grid-cols-[minmax(0,98px)] group/showAlts'>
      <Perk perk={perk} />
      {
        perk.alts.length > 0 &&
        <>
          <p className="absolute text-sm text-center rounded-sm rotate-3 pointer-events-none top-0 right-0 bg-otz aspect-square w-5 group-hover/showAlts:hidden">{`+${perk.alts.length}`}</p>
          <AltsBlock alts={perk.alts} />
        </>
      }
    </div>
  )
}

export const BuildPerksBlock = ({ perks }: BuildPerksBlockProps) => {
  return (
    <div className='flex gap-2 border-y border-neutral-800 py-2'>
      {perks.map((perk) => (
        perk.iconUrl
          ? <PerkBlock perk={perk} key={perk.name} />
          : <p>{perk.name}</p>
      ))}
    </div>
  );
};