import { createFileRoute } from '@tanstack/react-router';

import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { BuildPanels } from '@components/UI/BuildPanels';

export const Route = createFileRoute('/survivors')({
  component: SurvivorsPage,
});

function SurvivorsPage() {
  return (
    <BuildsPageLayout>
      <BuildPanels role='Survivors' />
    </BuildsPageLayout>
  )
}
