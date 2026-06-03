import type { BuildsData } from "@appTypes/Builds";
import type { ScrapeData } from "@appTypes/Scrape";

import { useBuildsJSON } from "@hooks/queries/useBuildsJSON"
import { useScrapeJSON } from "@hooks/queries/useScrapeJSON";
import { createContext, useContext } from "react"

interface AppDataContextType {
  builds: BuildsData,
  scrape: ScrapeData
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

export const useBuilds = () => {
  const { builds } = useContext(AppDataContext);
  return builds
}

export const useScrape = () => {
  const { scrape } = useContext(AppDataContext);
  return scrape
}

export const AppDataProvider = ({ children }) => {
  const { data: builds, isLoading: buildsLoading } = useBuildsJSON();
  const { data: scrape, isLoading: scrapeLoading } = useScrapeJSON();

  const isLoading = buildsLoading || scrapeLoading

  return (
    <AppDataContext value={{ builds, scrape }}>
      {!isLoading && children}
    </AppDataContext>
  )
}