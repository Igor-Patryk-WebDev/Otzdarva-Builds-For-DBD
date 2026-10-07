import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useProfileBuildsPortalState } from '@/hooks/stores/useCharacterBuildsPortalStore';
import { ProfilesPageLayout } from '@/pages/BuildsCatalogPage/layout/ProfilesPageLayout';
import { useGlobalAppStore } from '@/hooks/stores/useGlobalAppStore';
import { ProfilesWrapper } from '@/components/ProfilesWrapper';
import { ProfilePanel } from '@/pages/BuildsCatalogPage/components/ProfilePanel';
import { useHotkey } from '@tanstack/react-hotkeys';

export const Route = createFileRoute('/survivors')({
  beforeLoad: () => useGlobalAppStore.getState().actions.setSelectedRole("survivors"),
  component: SurvivorsPage,
});

function SurvivorsPage() {
  const navigate = useNavigate();
  const profileBuildsPortalState = useProfileBuildsPortalState();

  useHotkey("Q", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    navigate({ to: "/killers", viewTransition: { types: ["survivors-to-killers"] } });
  }, { enabled: !profileBuildsPortalState });
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-right"] } }), { enabled: !profileBuildsPortalState });

  return (
    <ProfilesPageLayout>
      {(searchQuery) => (
        <ProfilesWrapper role='survivors' searchQuery={searchQuery}>
          {(profile) => (
            <ProfilePanel key={profile.name} profile={profile} />
          )}
        </ProfilesWrapper>
      )}
    </ProfilesPageLayout>
  )
}
