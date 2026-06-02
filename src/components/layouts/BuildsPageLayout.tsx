import { BackToFrontPageButton } from "@components/UI/FrontPage"
import type { ReactNode } from "react"

interface BuildsPageLayoutProps {
  children: ReactNode
}

export const BuildsPageLayout = ({ children }: BuildsPageLayoutProps) => {
  return (
    <section>
      <BackToFrontPageButton />
      {children}
    </section>
  )
}