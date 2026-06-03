import type { Perk } from "@appTypes/Builds"
// import { usePerkIcons } from "@hooks/scrape/usePerkIcons";

interface BuildPerksBlockProps {
  perks: Perk[]
}

export const BuildPerksBlock = ({ perks }: BuildPerksBlockProps) => {
  // const { iconUrls } = usePerkIcons(perks);

  // if (isLoading) return <p>Loading...</p>

  return (
    <div>
      {perks.map((perk) => (
        <p>{perk.name}</p>
      ))}
    </div>
  )
}