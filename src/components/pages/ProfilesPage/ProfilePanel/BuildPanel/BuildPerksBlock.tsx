import type { ProfilePerk } from "@appTypes/Profiles";

interface BuildPerksBlockProps {
  perks: ProfilePerk[];
}

const PerkBlock = ({ perk }) => {
  return (
    <div key={perk.name}>
      <img src={perk.iconUrl} alt={perk.name + " perk icon"} />
      <p>{perk.name}</p>
    </div>
  )
}

export const BuildPerksBlock = ({ perks }: BuildPerksBlockProps) => {
  return (
    <div>
      {perks.map((perk) => (
        perk.iconUrl
          ? <PerkBlock perk={perk} />
          : <p>Perk does not exist! Oops..</p>
      ))}
    </div>
  );
};