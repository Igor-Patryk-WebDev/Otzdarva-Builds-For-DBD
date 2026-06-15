import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { ProfilesPageLayout } from '@components/layouts/ProfilesPageLayout';
import { ProfilesWrapper } from '@components/pages/ProfilesPage/ProfilesWrapper';
import { useHotkey } from '@tanstack/react-hotkeys';

export const Route = createFileRoute('/survivors')({
  component: SurvivorsPage,
});

function SurvivorsPage() {
  const navigate = useNavigate();
  useHotkey("Q", () => navigate({ to: "/killers", viewTransition: { types: ["survivors-to-killers"] } }));
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-right"] } }));

  return (
    <ProfilesPageLayout>
      {(searchQuery) => <ProfilesWrapper role='Survivors' searchQuery={searchQuery} />}
    </ProfilesPageLayout>
  )
}
