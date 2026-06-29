import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useProfileBuildsPortalState } from "@contexts/ProfileBuildsPortalContext";
import { ProfilesPageLayout } from "@components/layouts/ProfilesPageLayout";
import { ProfilesWrapper } from "@components/pages/ProfilesPage/ProfilesWrapper";
import { useHotkey } from "@tanstack/react-hotkeys";

export const Route = createFileRoute("/killers")({
  component: KillersPage,
});

function KillersPage() {
  const navigate = useNavigate();
  const { profileBuildsPortalState } = useProfileBuildsPortalState();

  useHotkey("E", () => navigate({ to: "/survivors", viewTransition: { types: ["killers-to-survivors"] } }), { enabled: !profileBuildsPortalState });
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-left"] } }), { enabled: !profileBuildsPortalState });

  return (
    <ProfilesPageLayout>
      {(searchQuery) => <ProfilesWrapper role="Killers" searchQuery={searchQuery} />}
    </ProfilesPageLayout>
  );
}
