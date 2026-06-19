import type { ProfileAlt, ProfilePerk } from "@appTypes/Profiles";
import { useState, useRef, useEffect, type ComponentPropsWithoutRef } from "react";

interface BuildPerksBlockProps {
  perks: ProfilePerk[];
}

const Perk = ({ perk }: { perk: Omit<ProfilePerk, "alts"> }) => {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [detailsHovered, setDetailsHovered] = useState(false);

  const visible = pinned && (hovered || detailsHovered);

  return (
    <div
      className={`relative group/perk max-h-24.5 aspect-square ${!visible && "cursor-pointer"}`}
      style={{
        anchorName: "--perk",
        anchorScope: "--perk",
      }}
      onClick={() => setPinned(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (!detailsHovered) setPinned(false);
      }}
    >
      <img
        className={`bg-[url(/images/perk-background-red.png)] bg-cover aspect-square p-[3%] hover:drop-shadow hover:drop-shadow-otz ${visible && "drop-shadow drop-shadow-otz"}`}
        src={perk.iconUrl}
        alt={perk.name + " perk icon"}
      />
      <PerkDetails
        perk={perk}
        visible={visible}
        onMouseEnter={() => setDetailsHovered(true)}
        onMouseLeave={() => {
          setDetailsHovered(false);
          setPinned(false);
        }}
      />
    </div>
  );
};

type PerkDetailsProps = ComponentPropsWithoutRef<"div"> & {
  perk: Omit<ProfilePerk, "alts">;
  visible: boolean;
};

const PerkDetails = ({ perk, visible, ...rest }: PerkDetailsProps) => {
  return (
    <div
      className={`fixed top-1/2 right-0 -translate-y-1/2 lg:translate-y-0 shadow-2xl shadow-black z-10000 w-full lg:w-150 bg-black ${visible ? "block" : "hidden"} lg:custom-anchor`}
      {...rest}
    >
      <div className='relative overflow-clip px-4 before:content-[""] before:absolute before:w-full before:h-full before:inset-0 before:bg-[url(/images/CharPortrait_roleBG.webp)] before:bg-size-[150%] before:bg-no-repeat before:bg-position-[center_50%] before:killers-filter before:-z-1'>
        <h3 className='text-xl sm:text-2xl font-bold border-b-2 py-2'>{perk.name}</h3>
        <p className='text-sm sm:text-base font-extralight italic py-2'>{perk.obtainment}</p>
      </div>
      <div className='bg-neutral-900 border border-t-0 border-neutral-800 p-4 text-xs sm:text-sm' dangerouslySetInnerHTML={{ __html: perk.description ?? "" }} />
      <p className="absolute block lg:hidden my-1 top-full right-1/2 translate-x-1/2 text-center">Click away to close</p>
    </div>
  );
};

const AltsBlock = ({ alts, expanded }: { alts: ProfileAlt[]; expanded: boolean }) => {
  return (
    <div className={`absolute w-full top-full z-4 grid transition-all ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 group-hover/showAlts:grid-rows-[1fr] group-hover/showAlts:opacity-100"}`}>
      <div className='overflow-hidden shadow-md shadow-black rounded-bl-lg rounded-br-lg bg-neutral-900 border border-t-0 border-neutral-800 min-h-0'>
        <div className="pb-4">
          {alts.map((alt) => {
            return (
              <Perk key={alt.name} perk={alt} />
            )
          })}
        </div>
      </div>
    </div>
  );
};

const PerkBlock = ({ perk }: { perk: ProfilePerk }) => {
  const [altsExpanded, setAltsExpanded] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  // Close alts when tapping outside on touch devices
  useEffect(() => {
    if (!altsExpanded) return;
    const handler = (e: PointerEvent) => {
      if (blockRef.current && !blockRef.current.contains(e.target as Node)) {
        setAltsExpanded(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [altsExpanded]);

  return (
    <div ref={blockRef} className="relative grid grid-cols-[minmax(0,98px)] group/showAlts">
      <Perk perk={perk} />
      {perk.alts.length > 0 && (
        <>
          <div
            className={`absolute bg-[url(/images/perk-background-red.png)] flex items-center justify-center bg-contain text-sm rounded-sm rotate-3 top-0 right-0 translate-x-1/4 aspect-square w-8 cursor-pointer transition-all ${altsExpanded ? "opacity-0 pointer-events-none" : "group-hover/showAlts:opacity-0"}`}
            onClick={(e) => {
              e.stopPropagation();
              setAltsExpanded((prev) => !prev);
            }}
          >
            <p className="w-full text-center">
              {`+${perk.alts.length}`}
            </p>
          </div>
          <AltsBlock alts={perk.alts} expanded={altsExpanded} />
        </>
      )}
    </div>
  );
};

export const BuildPerksBlock = ({ perks }: BuildPerksBlockProps) => {
  return (
    <div className='flex gap-2 border-y border-neutral-800 py-2'>
      {perks.map((perk) => (
        perk.iconUrl
          ? <PerkBlock perk={perk} key={perk.name} />
          : <p>Oops...</p>
      ))}
    </div>
  );
};
