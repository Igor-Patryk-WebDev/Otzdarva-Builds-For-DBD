import type { DbdRole } from "@/types/profiles.types"
import { useState } from "react";

type CharacterPortraitBlockProps = {
  name: string,
  portraitUrl: string
  role: Lowercase<DbdRole>
}

export const CharacterPortraitBlock = ({ name, portraitUrl, role }: CharacterPortraitBlockProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const styles = {
    killers: {
      filter: "killers-filter"
    },
    survivors: {
      filter: "survivors-filter"
    }
  }
  return (
    <div className='relative aspect-500/625 hidden md:block'>
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse rounded-lg z-2" />
      )}
      <img src="/images/CharPortrait_bg.webp" alt="" loading="lazy" className='absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] z-2 scale-140 select-none pointer-events-none' />
      <img src="/images/CharPortrait_roleBG.webp" alt="" loading="lazy" className={`absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] z-3 scale-140 select-none pointer-events-none ${styles[role].filter}`} />
      <img src={portraitUrl} alt={`${name} Portrait`} loading="lazy" onLoad={() => setIsLoaded(true)} className={`absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] z-4 scale-140 select-none pointer-events-none ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`} />
    </div>
  )
}