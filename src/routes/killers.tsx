import { ProfilesPageLayout } from "@components/layouts/ProfilesPageLayout";
import { ProfilesWrapper } from "@components/pages/ProfilesPage/ProfilesWrapper";
import { useBuildsPortalState } from "@contexts/BuildsPortalContext";
import { useHotkey } from "@tanstack/react-hotkeys";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/killers")({
  component: KillersPage,
});

function KillersPage() {
  const navigate = useNavigate();
  const buildsPortalState = useBuildsPortalState();
  useHotkey("E", () => navigate({ to: "/survivors", viewTransition: { types: ["killers-to-survivors"] } }));
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-left"] } }), { enabled: !buildsPortalState });

  return (
    <ProfilesPageLayout>
      {(searchQuery) => <ProfilesWrapper role="Killers" searchQuery={searchQuery} />}
    </ProfilesPageLayout>
  );
}
