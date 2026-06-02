import type { CharacterBuilds, Perk } from '@appTypes/Builds';

interface BuildPanelProps {
  characterName: string,
  builds: CharacterBuilds
}

const PerksBlock = ({ perks }: { perks: Record<string, Perk> }) => {
  const perksArray = Object.entries(perks)
  return (
    perksArray.map(([perkName, perkData]) => (
      <p className="bg-blue-900" key={perkName}>{perkData.name}</p>
    ))
  )
}
const NotesBlock = ({ notes }: { notes: string[] }) => {
  const notesArray = Object.entries(notes)
  return (
    notesArray.map(([noteId, note]) => (
      <p className="bg-blue-900" key={noteId}>{note}</p>
    ))
  )
}

export const BuildPanel = ({ characterName, builds }: BuildPanelProps) => {
  const buildsArray = Object.entries(builds)

  return (
    <div>
      <h3>{characterName}</h3>
      {buildsArray.map(([buildName, buildData]) => (
        <div key={buildName}>
          <p>{buildName}</p>
          <PerksBlock perks={buildData.perks} />
          <NotesBlock notes={buildData.buildNotes} />
        </div>
      ))}
    </div>
  )
}