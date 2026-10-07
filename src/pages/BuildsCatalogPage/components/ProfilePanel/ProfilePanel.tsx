import type { ProfileData } from '@/types/profiles.types';

import { CharacterPortraitBlock } from './CharacterPortraitBlock';
import { BuildsNotExistPanel } from './BuildsNotExistPanel';
import { useGenericBuild } from '@/hooks/builds/useGenericBuild';
import { ProfileHeader } from './ProfileHeader';
import { BuildPanel } from '../../../../components/BuildPanel';

type ProfilePanelProps = {
  profile: ProfileData
}

export const ProfilePanel = ({ profile }: ProfilePanelProps) => {
  const { name, portraitUrl, builds, role } = profile
  const { build } = useGenericBuild(builds);

  const buildsCount = builds?.length ?? 0

  return (
    <div className='relative grid grid-cols-1 md:grid-cols-[minmax(0,max-content)_minmax(25%,466px)]'>
      <ProfileHeader
        name={name}
        role={role}
        buildsCount={buildsCount}
      />
      <CharacterPortraitBlock
        name={name}
        role={role}
        portraitUrl={portraitUrl}
      />
      {
        build
          ? <BuildPanel build={build} profile={profile} />
          : <BuildsNotExistPanel />
      }
    </div >
  )
}
