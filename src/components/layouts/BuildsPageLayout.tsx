import { BackToFrontPageButton, FrontPageHeading } from "@components/UI/FrontPage"
import { AppDataProvider } from "@contexts/AppDataContext"
import { type ReactNode } from "react"

interface BuildsPageLayoutProps {
  children: ReactNode
}

export const BuildsPageLayout = ({ children }: BuildsPageLayoutProps) => {
  return (
    <section className='relative my-8'>
      <AppDataProvider>
        <BackToFrontPageButton />
        <FrontPageHeading />
        <div className='grid grid-cols-1 gap-4'>
          {children}
        </div>
      </AppDataProvider>
    </section>
  )
}