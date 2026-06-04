import type { ProfileData } from '@appTypes/Profiles';

import { CharacterPortraitBlock } from './CharacterPortraitBlock';
import { BuildPerksBlock } from './BuildPanel/BuildPerksBlock';
import { BuildNotesBlock } from './BuildPanel/BuildNotesBlock';
import { useGenericBuild } from '@hooks/builds/useGenericBuild';
import { BuildPanel } from './BuildPanel';

interface ProfilePanelProps {
  profile: ProfileData
}

export const ProfilePanel = ({ profile }: ProfilePanelProps) => {
  const name = profile.name
  const portrait = profile.portraitUrl
  const builds = profile.builds

  const { build } = useGenericBuild(builds);

  return (
    <div className='grid grid-cols-2 bg-amber-950'>
      <CharacterPortraitBlock name={name} portraitUrl={portrait} />
      {build && <BuildPanel build={build} />}
    </div>
  )
}