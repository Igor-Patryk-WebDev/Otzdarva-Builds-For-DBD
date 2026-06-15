import { useScrape } from "@contexts/AppDataContext"

export const LastUpdated = () => {
  const scrape = useScrape()
  const formatedDate = new Date((scrape.other.scrapeRequestUNIX) * 1000).toLocaleDateString()

  return (
    <p className="mb-4 text-sm sm:text-base sm:mb-8">
      Last updated: {formatedDate}
    </p>
  )
}