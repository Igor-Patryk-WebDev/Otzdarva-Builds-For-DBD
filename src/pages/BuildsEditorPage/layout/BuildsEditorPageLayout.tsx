import {
  type ReactNode,
  useState
} from "react";
import { CharacterBuildsManagerPortal } from "../components/Portals/CharacterBuildsManagerPortal";
import { NotificationsManagerPortal } from "@/pages/BuildsEditorPage/components/Portals/NotificationsManagerPortal";
import { BuildExpandedViewPortal } from "@/pages/BuildsCatalogPage/components/Portals/BuildExpandedViewPortal";
import { ActionsSidebarPortal } from "../components/Portals/ActionsSidebarPortal";
import { BuildsEditorPortal } from "@/pages/BuildsEditorPage/components/Portals/BuildsEditorPortal";
import { Navigation } from "../components/Navigation";
import { AltPerksListPortal } from "@/components/AltPerksListPortal";
import { PerkDescriptionPortal } from "@/components/PerkDescriptionPortal";

type BuildsEditorPageLayoutProps = {
  children: (searchQuery: string, perkQuery: string) => ReactNode;
};

export const BuildsEditorPageLayout = ({ children }: BuildsEditorPageLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [perkQuery, setPerkQuery] = useState('');

  return (
    <section className="min-h-screen">
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        perkQuery={perkQuery}
        setPerkQuery={setPerkQuery}
      />
      <div className="py-12">
        {children(searchQuery, perkQuery)}
      </div>
      <ActionsSidebarPortal />
      <BuildsEditorPortal />
      <NotificationsManagerPortal />
      <CharacterBuildsManagerPortal />
      <BuildExpandedViewPortal />
      <AltPerksListPortal />
      <PerkDescriptionPortal />
    </section>
  );
};
