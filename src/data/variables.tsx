import wikiData from "./wiki_scrape.json";

export const killerList = Object.entries(wikiData.characters.killers);

export const killerUniversal = wikiData.other.universalKiller.portrait;

export const survivorList = Object.entries(wikiData.characters.survivors);

const UnixTime = wikiData.other.updateDateUNIX;

const date = new Date(UnixTime * 1000);

export const UnixFormated = date.toLocaleString("en-GB");
