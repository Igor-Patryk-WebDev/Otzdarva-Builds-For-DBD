import { createFileRoute } from '@tanstack/react-router';

import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { ProfilesWrapper } from '@components/pages/ProfilesPage/ProfilesWrapper';

export const Route = createFileRoute('/survivors')({
  component: SurvivorsPage,
});

function SurvivorsPage() {
  return (
    <BuildsPageLayout>
      <ProfilesWrapper role='Survivors' />
    </BuildsPageLayout>
  )
}
