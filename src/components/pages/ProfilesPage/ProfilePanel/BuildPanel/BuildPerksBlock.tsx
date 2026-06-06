import type { ProfilePerk } from "@appTypes/Profiles";

interface BuildPerksBlockProps {
  perks: ProfilePerk[];
}

const PerkBlock = ({ perk }) => {
  return (
    <div className='grid grid-cols-[minmax(0,120px)]'>
      <div className='relative' key={perk.name}>
        <img className='bg-[url(/images/perk-background-red.png)] bg-cover aspect-square p-[3%]' src={perk.iconUrl} alt={perk.name + " perk icon"} />
      </div>
      {/* <p>{perk.name}</p> */}
    </div>
  )
}

export const BuildPerksBlock = ({ perks }: BuildPerksBlockProps) => {
  return (
    <div className='flex gap-2 border-y border-neutral-800 py-2'>
      {perks.map((perk) => (
        perk.iconUrl
          ? <PerkBlock perk={perk} />
          // : <p>Perk does not exist! Oops..</p>
          : <p>{perk.name}</p>
      ))}
    </div>
  );
};