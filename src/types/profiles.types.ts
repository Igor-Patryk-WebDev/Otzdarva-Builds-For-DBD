import type { Alt, Build, Perk } from "./builds.types";
import type { Character } from "./scrape.types";

export type DbdRole = Capitalize<keyof ProfilesData>

export type ProfileAlt = Alt & {
  iconUrl: string | undefined;
  description: string | undefined;
  obtainment: string | undefined;
}

export type ProfilePerk = Omit<Perk, "alts"> & {
  iconUrl: string | undefined;
  alts: ProfileAlt[];
  description: string | undefined;
  obtainment: string | undefined;
}

export type ProfileBuild = Omit<Build, "perks"> & {
  perks: ProfilePerk[];
}

export type ProfileData = Character & {
  builds: ProfileBuild[] | undefined;
  role: Lowercase<DbdRole>;
}

export type ProfilesData = {
  killers: ProfileData[];
  survivors: ProfileData[];
}
