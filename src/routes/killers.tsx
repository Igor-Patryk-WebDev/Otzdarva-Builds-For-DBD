import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProfilesPageLayout } from "@/pages/BuildsCatalogPage/layout/ProfilesPageLayout";
import { useGlobalAppStore, useHasActiveModals } from "@/hooks/stores/useGlobalAppStore";
import { ProfilesWrapper } from "@/components/ProfilesWrapper";
import { ProfilePanel } from "@/pages/BuildsCatalogPage/components/ProfilePanel";
import { useHotkey } from "@tanstack/react-hotkeys";

export const Route = createFileRoute("/killers")({
  beforeLoad: () => useGlobalAppStore.getState().actions.setSelectedRole("killers"),
  component: KillersPage,
});

function KillersPage() {
  const navigate = useNavigate();
  const hasActiveModals = useHasActiveModals();

  useHotkey(
    "E",
    () => {
      if (useGlobalAppStore.getState().activeModals.length > 0) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      navigate({ to: "/survivors", viewTransition: { types: ["killers-to-survivors"] } });
    },
    { enabled: !hasActiveModals, conflictBehavior: "allow" }
  );

  useHotkey(
    "Escape",
    () => {
      if (useGlobalAppStore.getState().activeModals.length > 0) return;
      navigate({ to: "/", viewTransition: { types: ["slide-left"] } });
    },
    { enabled: !hasActiveModals, conflictBehavior: "allow" }
  );

  return (
    <ProfilesPageLayout>
      {(searchQuery) =>
        <ProfilesWrapper role="killers" searchQuery={searchQuery}>
          {(profile) => (
            <ProfilePanel key={profile.name} profile={profile} />
          )}
        </ProfilesWrapper>
      }
    </ProfilesPageLayout>
  );
}
