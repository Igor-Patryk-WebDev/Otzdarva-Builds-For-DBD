import { RoleSelectWrapper } from "@components/pages/FrontPage";
import { WebsiteBanner } from "@components/pages/FrontPage";
import { LastUpdated } from "@components/pages/FrontPage";
import { SelfPlug } from "@components/pages/FrontPage/SelfPlug";
import { SocialWrapper } from "@components/pages/FrontPage/SocialWrapper";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  return (
    <section className="relative flex flex-col center h-screen w-screen p-8 [view-transition-name:front-page]">
      <WebsiteBanner />
      <LastUpdated />
      <RoleSelectWrapper />
      <SocialWrapper />
      <SelfPlug />
    </section>
  );
}
