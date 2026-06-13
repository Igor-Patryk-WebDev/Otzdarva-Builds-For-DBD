import type { ProfileData } from '@appTypes/Profiles';

import { useOpenBuildsPortal, useBuildsPortalContent, useBuildsPortalState } from '@contexts/BuildsPortalContext';
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

  const portalState = useBuildsPortalState();
  const openPortal = useOpenBuildsPortal();
  const { setBuildsPortalContent } = useBuildsPortalContent();

  const { build } = useGenericBuild(builds);

  const buildsCount = builds?.length ?? 0

  return (
    <div className='relative grid grid-cols-subgrid col-span-2 2xl:even:col-start-4'>
      <ProfileHeader name={name} buildsCount={buildsCount} onClick={() => {
        !portalState && setBuildsPortalContent(
          <BuildsList name={name}>
            {builds && builds.map((b) => (
              <BuildPanel key={b.name} build={b} />
            ))}
          </BuildsList>
        );
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