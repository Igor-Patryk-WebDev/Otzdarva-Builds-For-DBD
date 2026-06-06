import { createFileRoute } from '@tanstack/react-router';

import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { ProfilesWrapper } from '@components/pages/ProfilesPage/ProfilesWrapper';

export const Route = createFileRoute('/survivors')({
  component: SurvivorsPage,
});

function SurvivorsPage() {
  return (
    <BuildsPageLayout>
      {(searchQuery) => <ProfilesWrapper role='Survivors' searchQuery={searchQuery} />}
    </BuildsPageLayout>
  )
}
