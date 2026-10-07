import { useBuildsEditorPageDisplayMode } from "@/hooks/stores/BuildsEditorStores/useBuildsEditorPageStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CategorizedBuildsWrapper } from "@/pages/BuildsEditorPage/components/DisplayModes/CategorizedBuildsWrapper";
import { CharacterPanelsWrapper } from "@/pages/BuildsEditorPage/components/DisplayModes/CharacterPanelsWrapper";
import { BuildsEditorPageLayout } from "@/pages/BuildsEditorPage/layout/BuildsEditorPageLayout";

export const Route = createFileRoute("/builds-editor")({
  beforeLoad: async () => {
    const res = await fetch("/api/session.php");
    if (!res.ok) throw redirect({ to: "/login" });
  },
  component: BuildsEditorPage,
});

function BuildsEditorPage() {
  const displayMode = useBuildsEditorPageDisplayMode();

  return (
    <BuildsEditorPageLayout>
      {(searchQuery, perkQuery) => {
        switch (displayMode) {
          case "characterPanels":
            return <CharacterPanelsWrapper searchQuery={searchQuery} />
          case "categorizedBuilds":
            return <CategorizedBuildsWrapper searchQuery={searchQuery} perkQuery={perkQuery} />
        }
      }}
    </BuildsEditorPageLayout>
  );
}
