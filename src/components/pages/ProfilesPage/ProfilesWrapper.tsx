import type { DbdRole } from '@appTypes/DbdRole';

import { ProfilePanel } from './ProfilePanel';
import { useProfiles } from '@contexts/AppDataContext';

interface ProfilesWrapperProps {
  role: DbdRole;
  searchQuery?: string;
}

export const ProfilesWrapper = ({ role, searchQuery = '' }: ProfilesWrapperProps) => {
  const profiles = useProfiles();

  const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>;
  const roleProfiles = profiles[lowercaseRole];

  const filteredProfiles = searchQuery.trim()
    ? roleProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : roleProfiles;

  return (
    filteredProfiles.map((profile) => (
      <ProfilePanel key={profile.name} profile={profile} />
    ))
  );
}