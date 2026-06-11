import type { ProfileData } from '@appTypes/Profiles';

import { useOpenPortal, usePortalContent, usePortalState } from '@contexts/PortalContext';
import { CharacterPortraitBlock } from './CharacterPortraitBlock';
import { BuildsNotExistPanel } from './BuildsNotExistPanel';
import { useGenericBuild } from '@hooks/builds/useGenericBuild';
import { ProfileHeader } from './ProfileHeader';
import { BuildPanel } from './BuildPanel';
import { BuildsList } from './BuildsList';

interface ProfilePanelProps {
  profile: ProfileData
}

export const ProfilePanel = ({ profile }: ProfilePanelProps) => {
  const name = profile.name
  const portrait = profile.portraitUrl
  const builds = profile.builds
  const role = profile.role

  const portalState = usePortalState();
  const openPortal = useOpenPortal();
  const { setPortalContent } = usePortalContent();

  const { build } = useGenericBuild(builds);

  const buildsCount = builds?.length ?? 0

  return (
    <div className='relative grid grid-cols-subgrid col-span-2 2xl:even:col-start-4'>
      <ProfileHeader name={name} buildsCount={buildsCount} onClick={() => {
        !portalState && setPortalContent(<BuildsList builds={builds} />);
        !portalState && openPortal();
      }}>
      </ProfileHeader>
      <CharacterPortraitBlock name={name} portraitUrl={portrait} role={role} />
      {build
        ? <BuildPanel build={build} />
        : <BuildsNotExistPanel />
      }
    </div>
  )
}