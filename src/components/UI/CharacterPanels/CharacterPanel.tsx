import type { ProfileData } from '@appTypes/Profiles';

import { CharacterPortraitBlock } from './CharacterPortraitBlock';
import { BuildPerksBlock } from './BuildPerksBlock';
import { BuildNotesBlock } from './BuildNotesBlock';
import { useGenericBuild } from '@hooks/builds/useGenericBuild';

interface CharacterPanelProps {
  profile: ProfileData
}

export const CharacterPanel = ({ profile }: CharacterPanelProps) => {
  const builds = profile.builds
  const name = profile.name
  const portrait = profile.portraitUrl

  const { build } = useGenericBuild(builds);

  return (
    <div className='grid grid-cols-2 bg-amber-950'>
      <CharacterPortraitBlock name={name} imgUrl={portrait} />
      <div className='grid grid-cols-2'>
        <div>
          <p>{build.name}</p>
          <BuildPerksBlock perks={build.perks} />
        </div>
        <BuildNotesBlock notes={build.notes} />
      </div>
    </div>
  )
}