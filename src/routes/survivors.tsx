import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ProfilesPageLayout } from '@/pages/BuildsCatalogPage/layout/ProfilesPageLayout';
import { useGlobalAppStore, useHasActiveModals } from '@/hooks/stores/useGlobalAppStore';
import { ProfilesWrapper } from '@/components/ProfilesWrapper';
import { ProfilePanel } from '@/pages/BuildsCatalogPage/components/ProfilePanel';
import { useHotkey } from '@tanstack/react-hotkeys';

export const Route = createFileRoute('/survivors')({
  beforeLoad: () => useGlobalAppStore.getState().actions.setSelectedRole("survivors"),
  component: SurvivorsPage,
});

function SurvivorsPage() {
  const navigate = useNavigate();
  const hasActiveModals = useHasActiveModals();

  useHotkey(
    "Q",
    () => {
      if (useGlobalAppStore.getState().activeModals.length > 0) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      navigate({ to: "/killers", viewTransition: { types: ["survivors-to-killers"] } });
    },
    { enabled: !hasActiveModals, conflictBehavior: "allow" }
  );

  useHotkey(
    "Escape",
    () => {
      if (useGlobalAppStore.getState().activeModals.length > 0) return;
      navigate({ to: "/", viewTransition: { types: ["slide-right"] } });
    },
    { enabled: !hasActiveModals, conflictBehavior: "allow" }
  );

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
