import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { BuildsPageLayout } from '@components/layouts/BuildsPageLayout';
import { ProfilesWrapper } from '@components/pages/ProfilesPage/ProfilesWrapper';
import { useHotkey } from '@tanstack/react-hotkeys';

export const Route = createFileRoute('/survivors')({
  component: SurvivorsPage,
});

function SurvivorsPage() {
  const navigate = useNavigate();
  useHotkey("Q", () => navigate({ to: "/killers", viewTransition: { types: ["slide-right"] } }));
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-right"] } }));

  return (
    <BuildsPageLayout>
      {(searchQuery) => <ProfilesWrapper role='Survivors' searchQuery={searchQuery} />}
    </BuildsPageLayout>
  )
}
