import type { ProfilePerk } from "@appTypes/Profiles"

interface BuildPerksBlockProps {
  perks: ProfilePerk[]
}

export const BuildPerksBlock = ({ perks }: BuildPerksBlockProps) => {

  return (
    <div>
      {perks.map((perk) => (
        <div key={perk.name}>
          <img src={perk.iconUrl} alt={perk.name + " perk icon"} />
          <p>{perk.name}</p>
        </div>
      ))}
    </div>
  )
}