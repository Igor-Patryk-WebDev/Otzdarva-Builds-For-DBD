import type { DbdRole } from '@appTypes/DbdRole';

import { CharacterPanel } from './CharacterPanel';
import { useProfiles } from '@contexts/AppDataContext';

interface CharacterPanelsProps {
  role: DbdRole
}

export const CharacterPanels = ({ role }: CharacterPanelsProps) => {
  const profiles = useProfiles();

  const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>
  const roleProfiles = profiles[lowercaseRole]

  return (
    roleProfiles.map((profile) => {
      return <CharacterPanel profile={profile} />
    })
  )
}