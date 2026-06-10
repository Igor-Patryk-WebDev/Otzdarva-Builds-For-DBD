import type { ProfilePerk } from "@appTypes/Profiles";

interface BuildPerksBlockProps {
  perks: ProfilePerk[];
}

const PerkBlock = ({ perk }: { perk: ProfilePerk }) => {
  return (
    <div className='grid grid-cols-[minmax(0,120px)]'>
      <div className='group/perk hover:[anchor-name:--perk]'>
        <img className='cursor-pointer bg-[url(/images/perk-background-red.png)] bg-cover aspect-square p-[3%]' src={perk.iconUrl} alt={perk.name + " perk icon"} />
        <div className='fixed shadow-2xl shadow-black z-10000 min-w-100 max-w-150 hidden group-hover/perk:block bg-black' style={{ positionAnchor: '--perk', left: 'anchor(left)', top: 'anchor(bottom)' }}>
          <div className='relative overflow-clip px-4 before:content-[""] before:absolute before:w-full before:h-full before:inset-0 before:bg-[url(/images/CharPortrait_roleBG.webp)] before:bg-size-[150%] before:bg-no-repeat before:bg-position-[center_50%] before:killer-filter before:-z-1'>
            <h3 className='text-2xl font-bold border-b-2 py-2'>{perk.name}</h3>
            <p className='text-md font-extralight italic py-2'>{perk.obtainment}</p>
          </div>
          <div className='bg-neutral-900 border-2 border-t-0 border-neutral-800 p-4 text-sm' dangerouslySetInnerHTML={{ __html: perk.description }} />
        </div>
      </div>
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