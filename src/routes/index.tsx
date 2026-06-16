import { RoleSelectWrapper } from "@components/pages/FrontPage";
import { WebsiteBanner } from "@components/pages/FrontPage";
import { LastUpdated } from "@components/pages/FrontPage";
import { AnnouncementsPortal } from "@components/pages/FrontPage/Announcements/AnnouncementsPortal";
import { ReportBugButton } from "@components/pages/FrontPage/ReportBugButton";
import { SelfPlug } from "@components/pages/FrontPage/SelfPlug";
import { SocialWrapper } from "@components/pages/FrontPage/SocialWrapper";
import { Button } from "@components/shared/Button";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useAlertAutoDelete } from "@hooks/announcements/useAlertAutoDelete";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createPortal } from "react-dom";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  const navigate = useNavigate();

  const [showPortal, setShowPortal] = useState(false);

  useHotkey("Q", () =>
    navigate({ to: "/killers", viewTransition: { types: ["to-killers"] } }),
  );
  useHotkey("E", () =>
    navigate({ to: "/survivors", viewTransition: { types: ["to-survivors"] } }),
  );
  useHotkey("N", () => setShowPortal(true));
  useHotkey("Escape", () => setShowPortal(false));

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
          onClick={() => setShowPortal(true)}
        >
          🔔
        </Button>
        {showPortal &&
          createPortal(
            <AnnouncementsPortal onClose={() => setShowPortal(false)} />,
            document.body,
          )}
        <SocialWrapper />

        <SelfPlug />
        <div className="absolute bottom-4 right-4 hidden sm:block">
          <ReportBugButton />
        </div>
      </div>
    </section>
  );
}
