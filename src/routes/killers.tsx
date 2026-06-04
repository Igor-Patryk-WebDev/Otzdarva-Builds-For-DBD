import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { ProfilesWrapper } from '@components/pages/ProfilesPage/ProfilesWrapper';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/killers')({
  component: KillersPage,
});

function KillersPage() {
  return (
    <BuildsPageLayout>
      <ProfilesWrapper role='Killers' />
    </BuildsPageLayout>
  )
}
