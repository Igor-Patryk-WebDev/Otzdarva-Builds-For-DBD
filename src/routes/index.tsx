import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnnouncementsPortal } from "@components/pages/FrontPage/Announcements/AnnouncementsPortal";
import { useAlertAutoDelete } from "@hooks/announcements/useAlertAutoDelete";
import { RoleSelectWrapper } from "@components/pages/FrontPage";
import { ReportBugButton } from "@components/pages/FrontPage/ReportBugButton";
import { WebsiteBanner } from "@components/pages/FrontPage";
import { SocialWrapper } from "@components/pages/FrontPage/SocialWrapper";
import { LastUpdated } from "@components/pages/FrontPage";
import { useHotkey } from "@tanstack/react-hotkeys";
import { SelfPlug } from "@components/pages/FrontPage/SelfPlug";
import { useState } from "react";
import { IconSVG } from "@components/shared/IconSVG";
import { Button } from "@components/shared/Button";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  const navigate = useNavigate();

  const [announcementsPortalState, setAnnouncementsPortalState] = useState(false);

  useHotkey("Q", () =>
    navigate({ to: "/killers", viewTransition: { types: ["to-killers"] } }),
  );
  useHotkey("E", () =>
    navigate({ to: "/survivors", viewTransition: { types: ["to-survivors"] } }),
  );
  useHotkey("N", () => setAnnouncementsPortalState(true));
  useHotkey("Escape", () => setAnnouncementsPortalState(false));

  // useHotkeySequence(["S", "E", "C", "R", "E", "T"], () => console.log("hi"), { timeout: 1000 })

  useAlertAutoDelete();

  return (
    <section
      className="h-full flex center p-8 relative"
      style={{ viewTransitionName: "front-page" }}
    >
      <div className="flex max-w-full flex-col center">
        <WebsiteBanner />
        <LastUpdated />
        <RoleSelectWrapper />
        <Button
          className="p-2 rounded-lg absolute top-4 right-4"
          onClick={() => setAnnouncementsPortalState((prev) => !prev)}
        >
          <IconSVG icon="Bell" className="hover:text-amber-300" />
        </Button>
        {announcementsPortalState && <AnnouncementsPortal />}
        <SocialWrapper />
        <SelfPlug />
        <div className="absolute bottom-8 right-4">
          <ReportBugButton />
        </div>
      </div>
    </section>
  );
}
