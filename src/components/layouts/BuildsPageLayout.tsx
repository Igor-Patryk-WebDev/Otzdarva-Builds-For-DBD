import type { ReactNode } from "react";

import { WebsiteBanner } from "@components/pages/FrontPage";
import { Navigation } from "@components/pages/ProfilesPage/Navigation";
import { SearchBar } from "@components/shared/SearchBar";
import { useState } from "react";

interface BuildsPageLayoutProps {
  children: (searchQuery: string) => ReactNode;
}

export const BuildsPageLayout = ({ children }: BuildsPageLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="py-8 [view-transition-name:front-page]">
      <Navigation />
      <WebsiteBanner />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="max-w-211 2xl:max-w-400 my-24 sm:my-32 grid grid-cols-1 2xl:grid-cols-[minmax(0,250px)_minmax(25%,1fr)_40px_minmax(0,250px)_minmax(25%,1fr)] gap-y-24 px-4 sm:px-16 mx-auto">
        {children(searchQuery)}
      </div>
    </section>
  );
};
