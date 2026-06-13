import { RoleSelectWrapper } from "@components/pages/FrontPage";
import { WebsiteBanner } from "@components/pages/FrontPage";
import { LastUpdated } from "@components/pages/FrontPage";
import { SocialWrapper } from "@components/pages/FrontPage/SocialWrapper";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  return (
    <section className="flex justify-center h-screen p-8 [view-transition-name:front-page]">
      <div className="flex max-w-full flex-col center">
        <WebsiteBanner />
        <LastUpdated />
        <RoleSelectWrapper />
        <SocialWrapper />
      </div>
    </section>
  );
}
