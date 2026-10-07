import type { ReactNode } from "react";

import { BuildExpandedViewPortal } from "../components/Portals/BuildExpandedViewPortal";
import { ProfileBuildsPortal } from "../components/Portals/CharacterBuildsPreviewPortal";
import { WebsiteBanner } from "../../FrontPage/components";
import { Navigation } from "../components/Navigation";
import { SearchBar } from "@/components/shared/SearchBar";
import { useState } from "react";
import { AltPerksListPortal } from "@/components/AltPerksListPortal";
import { PerkDescriptionPortal } from "@/components/PerkDescriptionPortal";

interface ProfilesPageLayoutProps {
  children: (searchQuery: string) => ReactNode;
}

export const ProfilesPageLayout = ({ children }: ProfilesPageLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section
      className="py-8 px-4"
      style={{ viewTransitionName: "profiles-layout" }}
    >
      <Navigation />
      <WebsiteBanner />
      <div className="max-w-72 mx-auto">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
      </div>
      <div
        className="py-24 sm:py-32"
        style={{ viewTransitionName: "profiles-page" }}
      >
        <div className="grid auto-rows-min grid-cols-[minmax(0,max-content)] 2xl:grid-cols-[repeat(2,minmax(0,max-content))] justify-center gap-x-10 gap-y-24 sm:gap-y-32 ">
          {children(searchQuery)}
        </div>
      </div>
      <BuildExpandedViewPortal />
      <ProfileBuildsPortal />
      <AltPerksListPortal />
      <PerkDescriptionPortal />
    </section>
  );
};
