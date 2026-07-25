import type { BuildsData } from "@appTypes/builds.types";
import type { ProfilesData } from "@appTypes/profiles.types";
import type { ScrapeData } from "@appTypes/scrape.types";

import { createContext, useContext, type ReactNode } from "react"
import { useCustomProfiles } from "@hooks/profiles/useCustomProfiles";
import { useBuildsJSON } from "@hooks/queries/useBuildsJSON"
import { useScrapeJSON } from "@hooks/queries/useScrapeJSON";
import { Loader } from "@components/shared/Loader";

interface AppDataContextType {
  builds: BuildsData,
  scrape: ScrapeData
  profiles: ProfilesData
}

interface AppDataProviderProps {
  children: ReactNode
}

const AppDataContext = createContext<AppDataContextType>(undefined!)

export const useBuilds = () => {
  const { builds } = useContext(AppDataContext);
  return builds
}

export const useScrape = () => {
  const { scrape } = useContext(AppDataContext);
  return scrape
}

export const useProfiles = () => {
  const { profiles } = useContext(AppDataContext);
  return profiles
}

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const { data: builds, isLoading: buildsLoading, error: buildsError } = useBuildsJSON();
  const { data: scrape, isLoading: scrapeLoading, error: scrapeError } = useScrapeJSON();

  if (buildsError) console.error(buildsError)
  if (scrapeError) console.error(scrapeError)

  const isLoading = buildsLoading || scrapeLoading
  if (isLoading || !builds || !scrape) return <Loader />


  const profiles = useCustomProfiles({ builds, scrape });

  return (
    <AppDataContext value={{ builds, scrape, profiles }}>
      {children}
    </AppDataContext>
  )
}