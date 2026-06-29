import type { ProfileData, ProfilesData } from '@appTypes/Profiles';

import { useProfileBuildsPortalState, useProfileBuildsPortalContent } from '@contexts/ProfileBuildsPortalContext';
import { CharacterPortraitBlock } from './CharacterPortraitBlock';
import { ProfileBuildsWrapper } from './ProfileBuildsWrapper';
import { BuildsNotExistPanel } from './BuildsNotExistPanel';
import { useGenericBuild } from '@hooks/builds/useGenericBuild';
import { ProfileHeader } from './ProfileHeader';
import { BuildPanel } from './BuildPanel';

type ProfilePanelProps = {
  profile: ProfileData
}

export const ProfilePanel = ({ profile }: ProfilePanelProps) => {
  const name = profile.name
  const portrait = profile.portraitUrl
  const builds = profile.builds
  const role = profile.role

  const { profileBuildsPortalState, openProfileBuildsPortal } = useProfileBuildsPortalState();
  const { setProfileBuildsPortalContent } = useProfileBuildsPortalContent();

  const { build } = useGenericBuild(builds);

  const buildsCount = builds?.length ?? 0

  return (
    <div className='relative grid w-full grid-cols-1 sm:grid-cols-subgrid sm:col-span-2 2xl:even:col-start-4'>
      <ProfileHeader name={name} buildsCount={buildsCount} onClick={() => {
        !profileBuildsPortalState && setProfileBuildsPortalContent(() => (profiles: ProfilesData) => {
          const latestProfile = profiles[role].find((p) => p.name === name) ?? profile;
          const latestBuilds = latestProfile.builds;
          return (
            <ProfileBuildsWrapper name={name}>
              {latestBuilds && latestBuilds.map((b) => (
                <BuildPanel key={b.name} build={b} />
              ))}
            </ProfileBuildsWrapper>
          );
        });
        !profileBuildsPortalState && openProfileBuildsPortal();
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
