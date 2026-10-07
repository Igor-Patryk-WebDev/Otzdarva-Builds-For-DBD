import type { ComponentPropsWithoutRef } from "react"

type PerkBlockProps = {
  perkUrl: string | undefined
} & ComponentPropsWithoutRef<"div">

export const PerkBlock = ({ perkUrl, className, onClick }: PerkBlockProps) => {
  return (
    <div
      className={`relative aspect-square max-w-25 bg-[url(/images/perk-background-red.png)] bg-no-repeat bg-contain hover:drop-shadow hover:drop-shadow-otz cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={perkUrl}
        alt="Perk icon"
        className="absolute top-0 left-0  aspect-square w-full p-[2%]"
      />
    </div>
  )
}