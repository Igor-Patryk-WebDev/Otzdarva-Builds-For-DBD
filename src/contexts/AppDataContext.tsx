import type { BuildsData } from "@appTypes/Builds";
import type { ProfilesData } from "@appTypes/Profiles";
import type { ScrapeData } from "@appTypes/Scrape";

import { useCustomProfiles } from "@hooks/profiles/useCustomProfiles";
import { useBuildsJSON } from "@hooks/queries/useBuildsJSON"
import { useScrapeJSON } from "@hooks/queries/useScrapeJSON";
import { createContext, useContext, type ReactNode } from "react"

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
  const { data: builds, isLoading: buildsLoading } = useBuildsJSON();
  const { data: scrape, isLoading: scrapeLoading } = useScrapeJSON();

  const isLoading = buildsLoading || scrapeLoading
  if (isLoading || !builds || !scrape) return null

  const profiles = useCustomProfiles({ builds, scrape });

  return (
    <AppDataContext value={{ builds, scrape, profiles }}>
      {children}
    </AppDataContext>
  )
}