import { createFileRoute } from '@tanstack/react-router';

import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { CharacterPanels } from '@components/UI/CharacterPanels';

export const Route = createFileRoute('/survivors')({
  component: SurvivorsPage,
});

function SurvivorsPage() {
  return (
    <BuildsPageLayout>
      <CharacterPanels role='Survivors' />
    </BuildsPageLayout>
  )
}
