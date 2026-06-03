import { createFileRoute } from "@tanstack/react-router";
import { FrontPageHeading } from "@components/UI/FrontPage";
import { RoleSelectButtons } from "@components/UI/RoleSelectButtons";

import { useScrapeJSON } from "@hooks/queries/useScrapeJSON";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  const { data: wikiData, isLoading } = useScrapeJSON();
  const formatedDate = wikiData
    ? new Date((wikiData.other.updateDateUNIX as number) * 1000).toLocaleDateString()
    : null;

  return (
    <main className="flex flex-col center h-screen w-screen p-8 [view-transition-name:front-page]">
      <FrontPageHeading />
      <p className='mt-4 mb-8'>Last updated: {isLoading ? "--/--/--" : formatedDate}</p>
      <RoleSelectButtons />
    </main>
  );
}
