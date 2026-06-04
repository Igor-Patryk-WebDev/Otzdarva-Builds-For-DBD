import type { DbdRole } from '@appTypes/DbdRole';

import { ProfilePanel } from './ProfilePanel';
import { useProfiles } from '@contexts/AppDataContext';

interface ProfilesWrapperProps {
  role: DbdRole
}

export const ProfilesWrapper = ({ role }: ProfilesWrapperProps) => {
  const profiles = useProfiles();

  const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>
  const roleProfiles = profiles[lowercaseRole]

  return (
    roleProfiles.map((profile) => (
      <ProfilePanel profile={profile} />
    ))
  )
}