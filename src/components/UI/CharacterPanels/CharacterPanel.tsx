import type { Build } from '@appTypes/Builds';
import { CharacterPortraitBlock } from './CharacterPortraitBlock';
import { BuildPerksBlock } from './BuildPerksBlock';
import { BuildNotesBlock } from './BuildNotesBlock';

interface CharacterPanelProps {
  characterName: string,
  portraitUrl: string,
  displayBuild: Build
}

export const CharacterPanel = ({ characterName, portraitUrl, displayBuild }: CharacterPanelProps) => {
  return (
    <div className='grid grid-cols-2 bg-amber-950'>
      <CharacterPortraitBlock name={characterName} imgUrl={portraitUrl} />
      <div className='grid grid-cols-2'>
        <div>
          <p>{displayBuild.name}</p>
          <BuildPerksBlock perks={displayBuild.perks} />
        </div>
        <BuildNotesBlock notes={displayBuild.notes} />
      </div>
    </div>
  )
}