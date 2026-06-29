import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useProfileBuildsPortalState } from '@contexts/ProfileBuildsPortalContext';
import { ProfilesPageLayout } from '@components/layouts/ProfilesPageLayout';
import { ProfilesWrapper } from '@components/pages/ProfilesPage/ProfilesWrapper';
import { useHotkey } from '@tanstack/react-hotkeys';

export const Route = createFileRoute('/survivors')({
  component: SurvivorsPage,
});

function SurvivorsPage() {
  const navigate = useNavigate();
  const { profileBuildsPortalState } = useProfileBuildsPortalState();

  useHotkey("Q", () => navigate({ to: "/killers", viewTransition: { types: ["survivors-to-killers"] } }), { enabled: !profileBuildsPortalState });
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-right"] } }), { enabled: !profileBuildsPortalState });

  return (
    <ProfilesPageLayout>
      {(searchQuery) => <ProfilesWrapper role='Survivors' searchQuery={searchQuery} />}
    </ProfilesPageLayout>
  )
}
