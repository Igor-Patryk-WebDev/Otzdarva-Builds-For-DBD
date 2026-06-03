import type { Alt, Build, Perk } from "./Builds";
import type { RoleProfile } from "./Scrape";

export interface ProfileAlt extends Alt {
  iconUrl: string | null
}

export interface ProfilePerk extends Omit<Perk, "alts"> {
  iconUrl: string | null,
  alts: ProfileAlt[]
}

export interface ProfileBuild extends Omit<Build, "perks"> {
  perks: ProfilePerk[]
}

export interface ProfileData extends RoleProfile {
  builds: ProfileBuild[] | null
}

export interface ProfilesData {
  killers: ProfileData[],
  survivors: ProfileData[]
}