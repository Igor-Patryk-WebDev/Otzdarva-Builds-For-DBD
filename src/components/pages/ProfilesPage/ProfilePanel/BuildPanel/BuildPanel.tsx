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
    <div className='max-w-116.5 px-6 grid grid-rows-[auto_auto_1fr] bg-neutral-900 border border-neutral-800 rounded-lg shadow shadow-neutral-950'>
      <h3 className='text-2xl font-bold my-2 text-center'>{name}</h3>
      <BuildPerksBlock perks={perks} />
      <BuildNotesBlock notes={notes} />
    </div>
  )
}