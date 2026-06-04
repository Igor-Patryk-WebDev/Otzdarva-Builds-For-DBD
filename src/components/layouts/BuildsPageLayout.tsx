import { type ReactNode } from "react";

import {
  BackToFrontPageButton,
  WebsiteBanner,
} from "@components/pages/FrontPage";

interface BuildsPageLayoutProps {
  children: ReactNode;
}

export const BuildsPageLayout = ({ children }: BuildsPageLayoutProps) => {
  return (
    <section className="relative my-8">
      <BackToFrontPageButton />
      <WebsiteBanner />
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </section>
  );
};
