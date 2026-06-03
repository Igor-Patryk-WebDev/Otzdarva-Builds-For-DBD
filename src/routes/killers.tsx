import { createFileRoute } from '@tanstack/react-router';

import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { CharacterPanels } from '@components/UI/CharacterPanels';

export const Route = createFileRoute('/killers')({
  component: KillersPage,
});

function KillersPage() {
  return (
    <BuildsPageLayout>
      <CharacterPanels role='Killers' />
    </BuildsPageLayout>
  )
}
