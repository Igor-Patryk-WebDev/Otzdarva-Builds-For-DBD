import { createFileRoute } from '@tanstack/react-router';

import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { BuildPanels } from '@components/UI/BuildPanels';

export const Route = createFileRoute('/killers')({
  component: KillersPage,
});

function KillersPage() {
  return (
    <BuildsPageLayout>
      <BuildPanels role='Killers' />
    </BuildsPageLayout>
  )
}
