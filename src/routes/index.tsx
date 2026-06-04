import { RoleSelectWrapper } from "@components/pages/FrontPage";
import { WebsiteBanner } from "@components/pages/FrontPage";
import { LastUpdated } from "@components/pages/FrontPage";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  return (
    <section className="flex flex-col center h-screen w-screen p-8 [view-transition-name:front-page]">
      <WebsiteBanner />
      <LastUpdated />
      <RoleSelectWrapper />
    </section>
  );
}
