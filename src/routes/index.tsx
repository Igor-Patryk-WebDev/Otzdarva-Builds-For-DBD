import { createFileRoute } from "@tanstack/react-router";
import { FrontPageHeading } from "@components/UI/FrontPage";
import { RoleSelectButtons } from "@components/UI/RoleSelectButtons";
import { useScrape } from "@contexts/AppDataContext";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  const scrape = useScrape()
  const formatedDate = new Date((scrape.other.scrapeRequestUNIX) * 1000).toLocaleDateString()

  return (
    <main className="flex flex-col center h-screen w-screen p-8 [view-transition-name:front-page]">
      <FrontPageHeading />
      <p className="mt-4 mb-8">
        Last updated: {formatedDate}
      </p>
      <RoleSelectButtons />
    </main>
  );
}
