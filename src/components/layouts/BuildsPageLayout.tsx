import {
  BackToFrontPageButton,
  FrontPageHeading,
} from "@components/UI/FrontPage";
import { type ReactNode } from "react";

interface BuildsPageLayoutProps {
  children: ReactNode;
}

export const BuildsPageLayout = ({ children }: BuildsPageLayoutProps) => {
  return (
    <section className="relative my-8">
      <BackToFrontPageButton />
      <FrontPageHeading />
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </section>
  );
};
