import type { Dispatch, ReactNode, SetStateAction } from "react"
import type { DbdRole } from "@appTypes/DbdRole"

import { AnnouncementsPortalProvider } from "@contexts/AnnouncementsPortalContext"
import { AnnouncementsPortal } from "@components/pages/BuildCreator/AnnouncementsPortal"
import { ProfileBuildsPortal } from "@components/pages/ProfilesPage/ProfileBuildsPortal"
import { AdminNavigation } from "@components/pages/BuildCreator/AdminNavigation"
import { EditorPortal } from "@components/pages/BuildCreator/EditorPortal"

type BuildCreatorLayoutProps = {
  children: ReactNode
  setRole: Dispatch<SetStateAction<DbdRole>>;
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

export const BuildCreatorLayout = ({ children, setRole, searchQuery, setSearchQuery }: BuildCreatorLayoutProps) => {
  return (
    <section className="px-32 py-16">
      <AnnouncementsPortalProvider>
        <AdminNavigation setRole={setRole} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-items-center gap-y-24 gap-x-8 py-16">
          {children}
        </div>
        <ProfileBuildsPortal />
        <EditorPortal />
        <AnnouncementsPortal />
      </AnnouncementsPortalProvider>
    </section>
  )
}