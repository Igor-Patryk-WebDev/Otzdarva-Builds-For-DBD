import type { ProfileBuild } from "@appTypes/Profiles"
import { BuildPerksBlock } from "./BuildPerksBlock"
import { BuildNotesBlock } from "./BuildNotesBlock"

interface BuildPanelProps {
  build: ProfileBuild
}

export const BuildPanel = ({ build }: BuildPanelProps) => {
  const name = build.name
  const perks = build.perks
  const notes = build.notes

  return (
    <div className='grid grid-cols-2'>
      <p className='absolute bg-red-400'>{name}</p>
      <BuildPerksBlock perks={perks} />
      <BuildNotesBlock notes={notes} />
    </div>
  )
}