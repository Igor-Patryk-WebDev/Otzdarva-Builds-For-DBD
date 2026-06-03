import type { DbdRole } from '@appTypes/DbdRole';
import { CharacterPanel } from './CharacterPanel';
import { useGenericBuild } from '@hooks/builds/useGenericBuild';
import { useBuildProfiles } from '@hooks/useBuildProfiles';

interface CharacterPanelsProps {
  role: DbdRole
}

export const CharacterPanels = ({ role }: CharacterPanelsProps) => {
  const { profiles } = useBuildProfiles({ role });

  return (
    profiles.map((profile) => {
      const builds = profile.builds
      const name = profile.name
      const portrait = profile.portraitUrl

      const { build } = useGenericBuild(builds);

      return <CharacterPanel key={name} characterName={name} portraitUrl={portrait} displayBuild={build} />
    })
  )
}