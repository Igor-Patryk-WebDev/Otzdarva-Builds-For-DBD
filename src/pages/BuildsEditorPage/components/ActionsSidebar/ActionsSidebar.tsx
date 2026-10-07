import type { ComponentPropsWithoutRef } from "react";
import type { IconName } from "@/utils/IconsData";

import {
  useBuildsEditorPageActions,
  useBuildsEditorPageDisplayMode
} from "@/hooks/stores/BuildsEditorStores/useBuildsEditorPageStore";
import { useNotificationsManagerPortalActions } from "@/hooks/stores/BuildsEditorStores/useNotificationsManagerPortalStore";
import { useActionsSidebarPortalActions } from "@/hooks/stores/BuildsEditorStores/useActionsSidebarPortalStore";
// import { ScrapeWikiButton } from "./ScrapeWikiButton";
import { useScrape } from "@/contexts/AppDataContext";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Icon } from "@/components/shared/Icon";

type ActionsSidebarButtonProps = {
  title: string
  subtext: string
  icon: IconName
  isActive?: boolean
  onClick?: () => void
  disableSidebarClosing?: boolean
} & ComponentPropsWithoutRef<"button">

const ActionsSidebarButton = ({ title, subtext, icon, isActive, onClick, disableSidebarClosing }: ActionsSidebarButtonProps) => {
  const { closeActionsSidebarPortal } = useActionsSidebarPortalActions();

  return (
    <button
      className={`w-full flex items-center border-neutral-800 text-neutral-400 hover:text-neutral-200 justify-between p-2 rounded-xl border bg-neutral-950/40 hover:bg-neutral-950/80 text-sm font-medium transition-all group cursor-pointer active:border-otz ${isActive && "border-otz"}`}
      onClick={() => {
        onClick?.();
        !disableSidebarClosing && closeActionsSidebarPortal()
      }}
    >
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-black/30">
          <Icon icon={icon} className={`text-neutral-200 group-hover:text-otz ${isActive && "text-otz"} size-5`} />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-semibold text-white">
            {title}
          </span>
          <span className="text-xs text-white/70">
            {subtext}
          </span>
        </div>
      </div>
      <Icon
        icon="ArrowRight"
        className="text-neutral-200 group-hover:text-otz group-hover:translate-x-0.5 transition-[translate,color] size-6"
      />
    </button>
  )
}

export const ActionsSidebar = () => {
  const scrape = useScrape()
  const formatedDate = new Date((scrape.other.scrapeRequestUNIX) * 1000).toLocaleDateString()

  const displayMode = useBuildsEditorPageDisplayMode();
  const { setDisplayMode } = useBuildsEditorPageActions();

  const { openNotificationsManagerPortal } = useNotificationsManagerPortalActions();
  const { closeActionsSidebarPortal } = useActionsSidebarPortalActions();

  useHotkey("Escape", () => closeActionsSidebarPortal());

  return (
    <aside
      className="w-72 sm:w-80 h-full p-4 rounded-tr-xl rounded-br-xl bg-neutral-900 backdrop-blur-md border-r border-neutral-800 shadow-2xl flex flex-col duration-300 ease-in-out"
      aria-label="Admin Sidebar"
    >
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Icon icon="Menu" className="size-6 text-otz" />
          <h2 className="text-base font-bold text-white tracking-wide">
            Actions Panel
          </h2>
        </div>
        <button
          onClick={closeActionsSidebarPortal}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <Icon icon="Close" className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase px-2 mb-2 block">
            /// Display Modes
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <ActionsSidebarButton
                  title="Character Panels"
                  subtext="Displays every character"
                  icon="Grid"
                  isActive={displayMode === "characterPanels"}
                  onClick={() => setDisplayMode("characterPanels")}
                  disableSidebarClosing
                />
              </div>
              <div className="flex flex-col gap-2">
                <ActionsSidebarButton
                  title="Categorized Builds"
                  subtext="Displays every builds"
                  icon="Grid"
                  isActive={displayMode === "categorizedBuilds"}
                  onClick={() => setDisplayMode("categorizedBuilds")}
                  disableSidebarClosing
                />
              </div>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase px-2 mb-2 block">
            /// Management
            </span>
            <div className="flex flex-col gap-2">
              <ActionsSidebarButton
                title="Notifications"
                subtext="Manage site notifications"
                icon="Bell"
                onClick={openNotificationsManagerPortal}
              />
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase px-2 mb-2 block">
            /// Other
            </span>
            <div className="flex flex-col gap-2">
              <ActionsSidebarButton
                title="Wiki Scrape"
                subtext="Fetch latest characters & perks"
                icon="Copy"
                disableSidebarClosing
              />
              {/* <ScrapeWikiButton /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 pt-4 text-neutral-400 text-xs sm:text-sm">
        <p>
          Game version: 10.1.2
        </p>
        <p>
          Last updated: {formatedDate}
        </p>
      </div>
    </aside>
  );
};
