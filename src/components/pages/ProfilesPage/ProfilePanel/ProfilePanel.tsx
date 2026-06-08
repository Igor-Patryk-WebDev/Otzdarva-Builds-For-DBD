import type { ProfileData } from '@appTypes/Profiles';

import { CharacterPortraitBlock } from './CharacterPortraitBlock';
import { useGenericBuild } from '@hooks/builds/useGenericBuild';
import { BuildPanel } from './BuildPanel';

interface ProfilePanelProps {
  profile: ProfileData
}

export const ProfilePanel = ({ profile }: ProfilePanelProps) => {
  const name = profile.name
  const portrait = profile.portraitUrl
  const builds = profile.builds
  const role = profile.role

  const { build } = useGenericBuild(builds);

  return (
    <div className='relative grid grid-cols-subgrid col-span-2 even:col-start-4 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl shadow-neutral-950'>
      <div className='absolute bottom-[calc(100%+10px)] w-full grid grid-cols-[1fr_auto_1fr] gap-4 items-center'>
        <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
        <h3 className='text-2xl font-bold text-center z-2'>{name}</h3>
        <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
      </div>
      <CharacterPortraitBlock name={name} portraitUrl={portrait} role={role} />
      {
        build
          ? <BuildPanel build={build} />
          : (
            <div className='overflow-clip relative justify-items-center content-center rounded-md text-2xl font-bold before:content-[] before:bg-[url("/images/spiderweb.png")] before:bg-bottom-right before:bg-cover before:absolute before:inset-0 before:w-full before:h-full before:brightness-50'>
              <div className='w-max text-center -rotate-5'>
                <h3>It seems so empty here...</h3>
                <h3>Poor you :(</h3>
              </div>
            </div>
          )
      }
    </div>
  )
}

// bg-[url("/images/spiderweb.png")] bg-bottom-right bg-cover 