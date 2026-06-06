import { type ReactNode } from "react";

import { WebsiteBanner } from "@components/pages/FrontPage";
import { Navigation } from "@components/pages/ProfilesPage/Navigation";

interface BuildsPageLayoutProps {
  children: ReactNode;
}

export const BuildsPageLayout = ({ children }: BuildsPageLayoutProps) => {
  return (
    <section className="relative my-8">
      <Navigation />
      <WebsiteBanner />
      <div className="max-w-400 my-16 grid grid-cols-[minmax(0,250px)_minmax(25%,1fr)_40px_minmax(0,250px)_minmax(25%,1fr)] gap-y-20 px-16 mx-auto [view-transition-name:front-page]">
        {children}
      </div>
    </section>
  );
};
