import { useScrape } from "@/contexts/AppDataContext"

export const LastUpdated = () => {
  const scrape = useScrape()
  const formatedDate = new Date((scrape.other.scrapeRequestUNIX) * 1000).toLocaleDateString()

  return (
    <div className="flex flex-col items-center mb-4 sm:mb-8 text-neutral-400 text-xs sm:text-sm">
      <p className="">
        Game version: 10.1.2
      </p>
      <p className="">
        Last updated: {formatedDate}
      </p>
    </div>
  )
}