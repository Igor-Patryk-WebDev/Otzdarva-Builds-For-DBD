import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useProfileBuildsPortalState } from "@/hooks/stores/useCharacterBuildsPortalStore";
import { ProfilesPageLayout } from "@/pages/BuildsCatalogPage/layout/ProfilesPageLayout";
import { useGlobalAppStore } from "@/hooks/stores/useGlobalAppStore";
import { ProfilesWrapper } from "@/components/ProfilesWrapper";
import { ProfilePanel } from "@/pages/BuildsCatalogPage/components/ProfilePanel";
import { useHotkey } from "@tanstack/react-hotkeys";

export const Route = createFileRoute("/killers")({
  beforeLoad: () => useGlobalAppStore.getState().actions.setSelectedRole("killers"),
  component: KillersPage,
});

function KillersPage() {
  const navigate = useNavigate();
  const profileBuildsPortalState = useProfileBuildsPortalState();

  useHotkey("E", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    navigate({ to: "/survivors", viewTransition: { types: ["killers-to-survivors"] } });
  }, { enabled: !profileBuildsPortalState });
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-left"] } }), { enabled: !profileBuildsPortalState });

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
