import type { DbdRole } from "@appTypes/DbdRole"

interface CharacterPortraitBlockProps {
  name: string,
  portraitUrl: string
  role: Lowercase<DbdRole>
}

export const CharacterPortraitBlock = ({ name, portraitUrl, role }: CharacterPortraitBlockProps) => {
  const styles = {
    killers: {
      filter: "killers-filter"
    },
    survivors: {
      filter: "survivors-filter"
    }
  }
  return (
    <div className='relative aspect-500/625 hidden sm:block'>
      <img src="/images/CharPortrait_bg.webp" alt="" className='absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] z-1 scale-140 select-none pointer-events-none' />
      <img src="/images/CharPortrait_roleBG.webp" alt="" className={`absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] z-2 scale-140 select-none pointer-events-none ${styles[role].filter}`} />
      <img src={portraitUrl} alt={`${name} Portrait`} className='absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] z-3 scale-140 select-none pointer-events-none' />
    </div>
  )
}