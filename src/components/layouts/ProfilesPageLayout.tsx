import type { ReactNode } from "react";

import { ProfileBuildsPortal } from "@components/pages/ProfilesPage/ProfileBuildsPortal";
import { WebsiteBanner } from "@components/pages/FrontPage";
import { Navigation } from "@components/pages/ProfilesPage/Navigation";
import { SearchBar } from "@components/shared/SearchBar";
import { useState } from "react";

interface ProfilesPageLayoutProps {
  children: (searchQuery: string) => ReactNode;
}

export const ProfilesPageLayout = ({ children }: ProfilesPageLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section
      className="py-8"
      style={{ viewTransitionName: "profiles-layout" }}
    >
      <Navigation />
      <WebsiteBanner />
      <div className="max-w-72 mx-auto">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
      </div>
      <div
        className="max-w-211 2xl:max-w-400 my-24 sm:my-32 grid grid-cols-1 2xl:grid-cols-[minmax(0,250px)_minmax(25%,1fr)_40px_minmax(0,250px)_minmax(25%,1fr)] gap-y-24 sm:gap-y-32 px-4 sm:px-16 mx-auto"
        style={{ viewTransitionName: "profiles-page" }}
      >
        {children(searchQuery)}
      </div>
      <ProfileBuildsPortal />
    </section>
  );
};
