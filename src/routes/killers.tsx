import { BuildsPageLayout } from "@components/layouts/BuildsPageLayout";
import { ProfilesWrapper } from "@components/pages/ProfilesPage/ProfilesWrapper";
import { useHotkey } from "@tanstack/react-hotkeys";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/killers")({
  component: KillersPage,
});

function KillersPage() {
  const navigate = useNavigate();
  useHotkey("E", () => navigate({ to: "/survivors", viewTransition: { types: ["slide-left"] } }));
  useHotkey("Escape", () => navigate({ to: "/", viewTransition: { types: ["slide-left"] } }));

  return (
    <BuildsPageLayout>
      {(searchQuery) => (
        <ProfilesWrapper role="Killers" searchQuery={searchQuery} />
      )}
    </BuildsPageLayout>
  );
}
