import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAlertAutoDelete } from "@/hooks/announcements/useAlertAutoDelete";
import { RoleSelectWrapper } from "@/pages/FrontPage/components/RoleSelectWrapper";
import { Notifications } from "@/pages/FrontPage/components/Notifications";
import { WebsiteBanner } from "@/components/WebsiteBanner";
import { LastUpdated } from "@/pages/FrontPage/components/LastUpdated";
import { useHotkey } from "@tanstack/react-hotkeys";
import { BugReport } from "@/pages/FrontPage/components/BugReport";
import { Settings } from "@/pages/FrontPage/components/Settings";
import { SelfPlug } from "@/pages/FrontPage/components/SelfPlug";
import { Socials } from "@/pages/FrontPage/components/Socials";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  const navigate = useNavigate();

  useHotkey("Q", () =>
    navigate({ to: "/killers", viewTransition: { types: ["to-killers"] } }),
  );
  useHotkey("E", () =>
    navigate({ to: "/survivors", viewTransition: { types: ["to-survivors"] } }),
  );
  // useHotkey("N", () => { ANNOUNCEMENTS OPENING });
  // useHotkey("Escape", () => { ANNOUNCEMENTS CLOSING });

  // useHotkeySequence(["S", "E", "C", "R", "E", "T"], () => console.log("hi"), { timeout: 1000 })

  useAlertAutoDelete();

  return (
    <section
      className="h-full flex center p-4 sm:p-8 relative"
      style={{ viewTransitionName: "front-page" }}
    >
      <div className="flex max-w-full flex-col center">
        <div className="absolute top-8 right-4 flex gap-2">
          <Notifications />
        </div>
        <WebsiteBanner />
        <LastUpdated />
        <RoleSelectWrapper />
        <Socials />
        <SelfPlug />
        <div className="absolute bottom-8 right-4 flex gap-2">
          <BugReport />
          <Settings />
        </div>
      </div>
    </section>
  );
}
