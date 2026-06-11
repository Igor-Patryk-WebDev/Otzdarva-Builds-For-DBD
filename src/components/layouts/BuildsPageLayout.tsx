import type { ReactNode } from "react";

import { PortalProvider } from "@contexts/PortalContext";
import { WebsiteBanner } from "@components/pages/FrontPage";
import { PortalWrapper } from "@components/pages/ProfilesPage/PortalWrapper";
import { Navigation } from "@components/pages/ProfilesPage/Navigation";
import { SearchBar } from "@components/shared/SearchBar";
import { useState } from "react";

interface BuildsPageLayoutProps {
  children: (searchQuery: string) => ReactNode;
}

export const BuildsPageLayout = ({ children }: BuildsPageLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative my-8">
      <Navigation />
      <WebsiteBanner />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <PortalProvider>
        <div className="max-w-211 2xl:max-w-400 my-32 grid grid-cols-[minmax(0,250px)_minmax(25%,1fr)] 2xl:grid-cols-[minmax(0,250px)_minmax(25%,1fr)_40px_minmax(0,250px)_minmax(25%,1fr)] gap-y-24 px-16 mx-auto [view-transition-name:front-page]">
          {children(searchQuery)}
        </div>
        <PortalWrapper />
      </PortalProvider>
    </section>
  );
};
