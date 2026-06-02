import { useWikiScrape } from "./useWikiScrape";

export const useVariables = () => {
  const { data: wikiScrape, isLoading } = useWikiScrape();

  if (isLoading || !wikiScrape) {
    return {
      killersList: [] as any[],
      killerUniversal: null as string | null,
      survivorsList: [] as any[],
      formatedDate: "",
      isLoading: true
    };
  }

  const killersList = Object.entries(wikiScrape.characters.killers);
  const killerUniversal = wikiScrape.other.universalKiller;
  const survivorsList = Object.entries(wikiScrape.characters.survivors);

  const dateUNIX = wikiScrape.other.updateDateUNIX;
  const date = new Date(dateUNIX * 1000);
  const formatedDate = date.toLocaleDateString("en-GB");

  return {
    killersList,
    killerUniversal,
    survivorsList,
    formatedDate,
    isLoading: false
  };
};
