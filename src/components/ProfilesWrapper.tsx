import type { DbdRole, ProfileData } from '@/types/profiles.types';
import type { ReactNode } from 'react';

import { useProfiles } from '@/contexts/AppDataContext';

type ProfilesWrapperProps = {
  children: (profile: ProfileData) => ReactNode;
  role: DbdRole;
  searchQuery?: string;
}

export const ProfilesWrapper = ({ children, role, searchQuery = '' }: ProfilesWrapperProps) => {
  const profiles = useProfiles();

  const roleProfiles = profiles[role];

  const lowercaseQuery = searchQuery.trim().toLowerCase();

  const filteredProfiles =
    lowercaseQuery
      ? roleProfiles.filter((profile) => profile.name.toLowerCase().includes(lowercaseQuery))
      : roleProfiles;

  return (
    filteredProfiles.map((profile) => children(profile))
  );
}